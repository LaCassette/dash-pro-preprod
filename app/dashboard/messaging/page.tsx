'use client';


import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Info, Trash2, MoreVertical, Check, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfileForm } from '@/components/dashboard/user-profile-form';
import { Dumbbell, Apple } from 'lucide-react';

interface Chat {
  id: string;
  name: string | null;
  type: 'DIRECT' | 'GROUP';
  members: Array<{
    user: {
      id: string;
      name: string | null;
      email: string;
      picture: string | null;
      role: string;
    };
  }>;
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    sender: {
      id: string;
      name: string | null;
      email: string;
      picture: string | null;
    };
  }>;
  updatedAt: string;
  unreadCount?: number;
  hasUnread?: boolean;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    id: string;
    name: string | null;
    email: string;
    picture: string | null;
  };
  isRead?: boolean;
  isReadByAll?: boolean;
  readCount?: number;
}

export default function MessagingPage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('messaging');
  const tCommon = useTranslations('common');

  const chatIdFromUrl = searchParams.get('chatId');

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  useEffect(() => {
    if (chatIdFromUrl && chats.length > 0) {
      const chat = chats.find((c) => c.id === chatIdFromUrl);
      if (chat) {
        setSelectedChat(chat);
        fetchMessages(chat.id, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatIdFromUrl, chats]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id, true);
      // Polling pour les nouveaux messages toutes les 10 secondes (réduit pour éviter le lag)
      const interval = setInterval(() => {
        if (selectedChat) {
          fetchMessages(selectedChat.id, false);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    // Scroll vers le bas quand de nouveaux messages arrivent
    // Seulement si l'utilisateur est proche du bas (dans les 100px)
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom || messages.length === 0) {
        setTimeout(() => scrollToBottom(), 100);
      }
    }
  }, [messages]);

  function scrollToBottom() {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }

  async function fetchChats() {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to fetch chats:', errorData);
        throw new Error(errorData.error || 'Failed to fetch chats');
      }
      const data = await response.json();
      setChats(data);

      // Si un chatId est dans l'URL, le sélectionner
      if (chatIdFromUrl) {
        const chat = data.find((c: Chat) => c.id === chatIdFromUrl);
        if (chat) {
          setSelectedChat(chat);
        }
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages(chatId: string, showError = false) {
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      if (!response.ok) {
        if (response.status === 403) {
          // L'utilisateur n'est plus membre du chat
          if (showError) {
            toast({
              title: 'Erreur',
              description: 'Vous n\'avez plus accès à cette conversation',
              variant: 'destructive',
            });
          }
          setSelectedChat(null);
          router.push('/dashboard/messaging');
          return;
        }
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
      // Marquer tous les messages non lus comme lus
      markMessagesAsRead(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (showError) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les messages',
          variant: 'destructive',
        });
      }
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !selectedChat || sending) return;

    setSending(true);
    try {
      const response = await fetch(`/api/chats/${selectedChat.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');

      // Rafraîchir la liste des chats pour mettre à jour le dernier message
      await fetchChats();

      // Scroll vers le bas après l'envoi
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          error instanceof Error
            ? error.message
            : 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  }

  function getChatDisplayName(chat: Chat): string {
    if (chat.name) return chat.name;
    if (chat.type === 'DIRECT') {
      const otherMember = chat.members.find((m) => m.user.id !== user?.id);
      return otherMember?.user.name || otherMember?.user.email || 'Conversation';
    }
    return 'Groupe';
  }

  function getChatDisplayPicture(chat: Chat): string | null {
    if (chat.type === 'DIRECT') {
      const otherMember = chat.members.find((m) => m.user.id !== user?.id);
      return otherMember?.user.picture || null;
    }
    return null;
  }

  function getLastMessage(chat: Chat): string {
    if (chat.messages.length === 0) return 'Aucun message';
    const lastMsg = chat.messages[0];
    return lastMsg.content.substring(0, 50) + (lastMsg.content.length > 50 ? '...' : '');
  }

  function getOtherUser() {
    if (!selectedChat || selectedChat.type !== 'DIRECT') return null;
    return selectedChat.members.find((m) => m.user.id !== user?.id)?.user;
  }

  async function markChatAsRead(chatId: string) {
    try {
      await fetch(`/api/chats/${chatId}/read`, {
        method: 'POST',
      });
      // Rafraîchir la liste des chats pour mettre à jour les compteurs
      fetchChats();
    } catch (error) {
      console.error('Error marking chat as read:', error);
    }
  }

  async function markMessagesAsRead(messages: Message[]) {
    if (!user) return;

    // Marquer tous les messages non lus des autres comme lus
    const unreadMessages = messages.filter(
      (msg) => msg.senderId !== user.id && !msg.isRead
    );

    // Marquer chaque message comme lu (en arrière-plan, sans bloquer)
    Promise.all(
      unreadMessages.map((msg) =>
        fetch(`/api/messages/${msg.id}/read`, {
          method: 'POST',
        }).catch((error) => {
          console.error(`Error marking message ${msg.id} as read:`, error);
        })
      )
    ).then(() => {
      // Rafraîchir les messages pour mettre à jour les statuts
      if (selectedChat) {
        fetchMessages(selectedChat.id, false);
      }
      // Rafraîchir la liste des chats pour mettre à jour les compteurs
      fetchChats();
    });
  }

  async function handleDeleteChat() {
    if (!selectedChat || deleting) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/chats/${selectedChat.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete chat');
      }

      toast({
        title: 'Succès',
        description: 'Conversation supprimée avec succès',
      });

      setSelectedChat(null);
      router.push('/dashboard/messaging');
      fetchChats();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de supprimer la conversation',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div>Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 h-[calc(100vh-200px)]">
        {/* Liste des conversations */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {chats.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {t('noConversations')}
                  </p>
                ) : (
                  chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChat(chat);
                        router.push(`/dashboard/messaging?chatId=${chat.id}`);
                        // Marquer comme lu
                        markChatAsRead(chat.id);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedChat?.id === chat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={getChatDisplayPicture(chat) || undefined}
                          />
                          <AvatarFallback>
                            {getChatDisplayName(chat)
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium truncate ${chat.hasUnread ? 'font-bold' : ''}`}>
                              {getChatDisplayName(chat)}
                            </p>
                            {chat.unreadCount && chat.unreadCount > 0 && (
                              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-xs truncate ${selectedChat?.id === chat.id
                                ? 'text-primary-foreground/80'
                                : chat.hasUnread
                                  ? 'font-semibold text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                          >
                            {getLastMessage(chat)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Zone de messages */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={getChatDisplayPicture(selectedChat) || undefined}
                      />
                      <AvatarFallback>
                        {getChatDisplayName(selectedChat)
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{getChatDisplayName(selectedChat)}</CardTitle>
                      {selectedChat.type === 'DIRECT' && (
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.members
                            .find((m) => m.user.id !== user?.id)
                            ?.user.email || ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedChat.type === 'DIRECT' && getOtherUser() && user?.role === 'PRO' && (
                      <Dialog open={showClientInfo} onOpenChange={setShowClientInfo}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-[95vw] h-[95vh] max-h-[95vh] !flex !flex-col !grid-cols-none gap-0 p-0 overflow-hidden">
                          <div className="flex-shrink-0 p-6 border-b bg-background">
                            <DialogHeader>
                              <DialogTitle>Profil de {getOtherUser()?.name || getOtherUser()?.email}</DialogTitle>
                              <DialogDescription>
                                Informations sportives et nutritionnelles du client
                              </DialogDescription>
                            </DialogHeader>
                          </div>
                          <div className="flex-1 overflow-hidden min-h-0">
                            <Tabs defaultValue="sport" className="w-full h-full flex flex-col">
                              <TabsList className="flex-shrink-0 mx-6 mt-4 mb-4">
                                <TabsTrigger value="sport">
                                  <Dumbbell className="mr-2 h-4 w-4" />
                                  Profil Sportif
                                </TabsTrigger>
                                <TabsTrigger value="nutrition">
                                  <Apple className="mr-2 h-4 w-4" />
                                  Profil Nutritionnel
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="sport" className="flex-1 overflow-hidden mt-0 px-6 pb-6">
                                <ScrollArea className="h-full w-full">
                                  <div className="pr-4">
                                    <UserProfileForm
                                      open={true}
                                      onOpenChange={() => { }}
                                      userId={getOtherUser()!.id}
                                      type="SPORT"
                                      embedded={true}
                                      onSuccess={() => { }}
                                    />
                                  </div>
                                </ScrollArea>
                              </TabsContent>
                              <TabsContent value="nutrition" className="flex-1 overflow-hidden mt-0 px-6 pb-6">
                                <ScrollArea className="h-full w-full">
                                  <div className="pr-4">
                                    <UserProfileForm
                                      open={true}
                                      onOpenChange={() => { }}
                                      userId={getOtherUser()!.id}
                                      type="NUTRITION"
                                      embedded={true}
                                      onSuccess={() => { }}
                                    />
                                  </div>
                                </ScrollArea>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer la conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4"
                >
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        {t('noMessages')}
                      </div>
                    ) : (
                      <>
                        {messages.map((msg) => {
                          const isOwnMessage = msg.senderId === user?.id;
                          return (
                            <div
                              key={msg.id}
                              className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''
                                }`}
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={msg.sender.picture || undefined}
                                />
                                <AvatarFallback>
                                  {msg.sender.name
                                    ? msg.sender.name.charAt(0).toUpperCase()
                                    : msg.sender.email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'
                                  }`}
                              >
                                <div
                                  className={`rounded-lg px-4 py-2 ${isOwnMessage
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted'
                                    }`}
                                >
                                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <p className="text-xs text-muted-foreground">
                                    {format(new Date(msg.createdAt), 'HH:mm')}
                                  </p>
                                  {isOwnMessage && (
                                    <div className="ml-1">
                                      {msg.isReadByAll ? (
                                        <CheckCheck className="h-3 w-3 text-primary" />
                                      ) : msg.isRead ? (
                                        <CheckCheck className="h-3 w-3 text-muted-foreground" />
                                      ) : (
                                        <Check className="h-3 w-3 text-muted-foreground" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="border-t p-4 flex gap-2"
                >
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    disabled={sending}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <Button type="submit" disabled={sending || !message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t('selectConversation')}</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChat}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
