'use client';
export const runtime = 'edge';


import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { useTheme } from 'next-themes';
import { useBaseten, BasetenMessage } from '@/hooks/use-baseten';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Bot, Send, Loader2, ArrowLeft, Sparkles, Search, History, RotateCcw, Copy, Check, Plus, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAgentByName, defaultAgents, DefaultAgent } from '@/lib/default-agents';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Agent {
  id: string;
  name: string;
  prompt: string;
  context: string | null;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Get suggested questions for agent - use from default-agents or fallback
const getSuggestedQuestions = (agentName: string): string[] => {
  // First try to find matching agent in default agents
  const defaultAgent = getAgentByName(agentName);
  if (defaultAgent) {
    return defaultAgent.suggestedQuestions;
  }

  // Fallback: detect by name pattern
  const name = agentName.toLowerCase();
  if (name.includes('sportif') || name.includes('coach')) {
    return [
      // Questions générales sur la programmation
      'Comment créer un programme d\'entraînement personnalisé pour un client débutant de [âge] ans, [poids] kg, [taille] cm ?',
      'Quel programme d\'entraînement recommander pour un objectif de perte de poids de [X] kg en [Y] mois ?',
      'Comment structurer un programme de prise de masse pour un client de niveau intermédiaire ?',
      'Quelle est la meilleure répartition hebdomadaire pour un programme full-body vs split ?',
      'Comment adapter un programme d\'entraînement pour un client avec [blessure spécifique] ?',

      // Questions sur les exercices spécifiques
      'Quels sont les meilleurs exercices pour développer les [groupe musculaire] chez un débutant ?',
      'Comment progresser sur les exercices polyarticulaires (squat, deadlift, bench press) ?',
      'Quelle est la technique correcte pour exécuter [exercice spécifique] ?',
      'Comment varier les exercices pour éviter la stagnation ?',
      'Quels exercices recommander pour un client avec des limitations articulaires aux [articulation] ?',

      // Questions sur la périodisation
      'Comment structurer une périodisation sur [X] semaines pour un objectif de [objectif] ?',
      'Quelle est la différence entre périodisation linéaire, ondulatoire et en bloc ?',
      'Comment gérer les phases de récupération et de deload ?',
      'Comment planifier les pics de performance pour une compétition dans [X] mois ?',

      // Questions sur l'intensité et le volume
      'Quel volume d\'entraînement recommander pour un client de niveau [niveau] ?',
      'Comment déterminer les charges optimales pour un client de [force actuelle] ?',
      'Quelle est la relation entre intensité, volume et fréquence d\'entraînement ?',
      'Comment progresser en force vs en hypertrophie ?',

      // Questions sur la récupération
      'Comment optimiser la récupération entre les séances pour un client qui s\'entraîne [X] fois par semaine ?',
      'Quels sont les signes de surentraînement et comment les prévenir ?',
      'Comment adapter l\'entraînement selon le niveau de fatigue du client ?',
      'Quelle est l\'importance du sommeil dans la récupération ?',

      // Questions spécifiques par objectif
      'Comment créer un programme pour améliorer l\'endurance cardiovasculaire ?',
      'Quel programme recommander pour améliorer la mobilité et la flexibilité ?',
      'Comment intégrer l\'entraînement fonctionnel dans un programme classique ?',
      'Quelle approche pour un client souhaitant améliorer sa composition corporelle ?',

      // Questions sur les populations spécifiques
      'Comment adapter un programme pour un client senior de [âge] ans ?',
      'Quel programme recommander pour une femme enceinte au [trimestre] trimestre ?',
      'Comment créer un programme pour un adolescent de [âge] ans en croissance ?',
      'Quelle approche pour un client avec des problèmes de dos chroniques ?',

      // Questions sur la motivation et le suivi
      'Comment maintenir la motivation d\'un client sur le long terme ?',
      'Quels indicateurs suivre pour mesurer les progrès d\'un client ?',
      'Comment adapter un programme quand un client stagne ?',
      'Quelle stratégie pour gérer les plateaux de progression ?',

      // Questions techniques avancées
      'Comment utiliser les méthodes d\'intensification (drop sets, rest-pause, etc.) ?',
      'Quelle est l\'importance de la technique vs la charge dans l\'entraînement ?',
      'Comment intégrer l\'entraînement pliométrique dans un programme ?',
      'Quelle approche pour développer la puissance et l\'explosivité ?',
    ];
  } else if (name.includes('nutrition') || name.includes('nutritionniste')) {
    return [
      // Questions sur la planification nutritionnelle
      'Comment créer un plan nutritionnel personnalisé pour un client de [âge] ans, [poids] kg, [taille] cm, [niveau d\'activité] ?',
      'Quel plan nutritionnel recommander pour un objectif de perte de poids de [X] kg en [Y] mois ?',
      'Comment calculer les besoins caloriques précis pour un client avec un métabolisme de base de [BMR] kcal ?',
      'Quelle répartition des macronutriments (protéines, glucides, lipides) pour un objectif de [objectif] ?',
      'Comment adapter un plan nutritionnel selon le type d\'entraînement (force, endurance, mixte) ?',

      // Questions sur les macronutriments
      'Quelle quantité de protéines recommander pour un client de [poids] kg avec un objectif de [objectif] ?',
      'Comment répartir les glucides autour de l\'entraînement pour optimiser les performances ?',
      'Quels sont les meilleurs types de lipides à inclure dans un plan nutritionnel ?',
      'Comment gérer l\'apport en glucides pour un client en sèche vs en prise de masse ?',
      'Quelle stratégie pour atteindre [X] g de protéines par jour de manière pratique ?',

      // Questions sur les repas et timing
      'Comment structurer les repas pour un client qui s\'entraîne [moment de la journée] ?',
      'Quoi manger avant, pendant et après un entraînement de [type d\'entraînement] ?',
      'Comment gérer la nutrition pour un client qui s\'entraîne à jeun ?',
      'Quelle stratégie nutritionnelle pour un client avec des horaires de travail irréguliers ?',
      'Comment répartir les calories sur [X] repas par jour ?',

      // Questions sur les régimes spécifiques
      'Quel plan nutritionnel recommander pour un client végétarien/végétalien ?',
      'Comment adapter la nutrition pour un client intolérant au lactose/gluten ?',
      'Quelle approche pour un client suivant un régime cétogène ?',
      'Comment créer un plan nutritionnel pour un client avec des allergies alimentaires ([allergènes]) ?',
      'Quelle stratégie pour un client souhaitant suivre un régime intermittent fasting ?',

      // Questions sur la perte de poids
      'Comment créer un déficit calorique optimal pour une perte de poids durable ?',
      'Quelle vitesse de perte de poids est saine et réaliste ?',
      'Comment gérer les fringales et les envies de sucre pendant une perte de poids ?',
      'Quelle stratégie pour éviter la perte de masse musculaire pendant une sèche ?',
      'Comment adapter la nutrition pendant un plateau de perte de poids ?',

      // Questions sur la prise de masse
      'Comment créer un surplus calorique optimal pour une prise de masse propre ?',
      'Quelle stratégie nutritionnelle pour maximiser la synthèse protéique ?',
      'Comment gérer l\'appétit pour un client qui a du mal à manger suffisamment ?',
      'Quels aliments recommander pour un client souhaitant prendre de la masse sans trop de gras ?',
      'Comment répartir les calories pour une prise de masse efficace ?',

      // Questions sur les compléments
      'Quels compléments alimentaires recommander pour un client avec un objectif de [objectif] ?',
      'Comment intégrer la créatine dans un plan nutritionnel ?',
      'Quelle est l\'utilité des BCAA et quand les recommander ?',
      'Comment utiliser les protéines en poudre de manière optimale ?',
      'Quels compléments pour améliorer la récupération ?',

      // Questions sur l\'hydratation
      'Quelle quantité d\'eau recommander pour un client de [poids] kg qui s\'entraîne [X] fois par semaine ?',
      'Comment gérer l\'hydratation pendant l\'entraînement de longue durée ?',
      'Quelle stratégie d\'hydratation pour un client en sèche ?',
      'Comment reconnaître et prévenir la déshydratation ?',

      // Questions sur les populations spécifiques
      'Comment adapter la nutrition pour une femme enceinte ou allaitante ?',
      'Quel plan nutritionnel pour un client senior de [âge] ans ?',
      'Comment créer un plan nutritionnel pour un adolescent en croissance ?',
      'Quelle approche nutritionnelle pour un client avec des problèmes de santé ([condition]) ?',

      // Questions sur la composition corporelle
      'Comment améliorer la composition corporelle (ratio muscle/gras) ?',
      'Quelle stratégie pour réduire le pourcentage de masse grasse de [X]% à [Y]% ?',
      'Comment maintenir la masse musculaire pendant une perte de poids ?',
      'Quelle approche pour un client avec un métabolisme lent ?',

      // Questions pratiques
      'Comment préparer des repas en batch pour la semaine ?',
      'Quels sont les meilleurs aliments à avoir toujours dans sa cuisine ?',
      'Comment lire et comprendre les étiquettes nutritionnelles ?',
      'Quelle stratégie pour manger sainement au restaurant ?',
      'Comment gérer les écarts et les repas de triche ?',

      // Questions sur le suivi et l\'ajustement
      'Quels indicateurs suivre pour mesurer les progrès nutritionnels ?',
      'Comment ajuster un plan nutritionnel quand un client stagne ?',
      'Quelle fréquence de pesée et de mesures recommandée ?',
      'Comment adapter la nutrition selon les résultats et les retours du client ?',

      // Questions sur les troubles alimentaires
      'Comment aider un client avec une relation compliquée à la nourriture ?',
      'Quelle approche pour un client avec des antécédents de troubles alimentaires ?',
      'Comment créer un environnement nutritionnel sain et non restrictif ?',
    ];
  } else {
    return [
      'Comment puis-je vous aider aujourd\'hui ?',
      'Quels sont vos conseils principaux ?',
      'Par où commencer ?',
      'Quelle est votre approche ?',
    ];
  }
};

export default function AssistantChatPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { getAccentColor } = useOrganization();
  const { theme } = useTheme();
  const { generate, loading, error } = useBaseten();
  const { toast } = useToast();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loadingAgent, setLoadingAgent] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const accentColor = getAccentColor(theme === 'dark');
  const agentId = params.id as string;
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user && agentId) {
      fetchAgent();
      const sessionId = searchParams?.get('sessionId');
      if (sessionId && agent) {
        loadSession(sessionId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, agentId]);

  useEffect(() => {
    const sessionId = searchParams?.get('sessionId');
    if (sessionId && agent) {
      loadSession(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function fetchAgent() {
    try {
      const response = await fetch(`/api/agents/${agentId}`);
      if (!response.ok) throw new Error('Failed to fetch agent');
      const data = await response.json();
      setAgent(data);

      // Initialiser avec le message système
      if (data.prompt) {
        setMessages([
          {
            role: 'system',
            content: data.prompt,
          },
        ]);
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger l\'assistant',
        variant: 'destructive',
      });
      router.push('/dashboard/assistants');
    } finally {
      setLoadingAgent(false);
    }
  }

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async function handleSendMessage() {
    if (!input.trim() || loading || !agent) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Construire les messages pour Baseten (inclure le système)
    const basetenMessages: BasetenMessage[] = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // Ajouter le prompt système au début
    basetenMessages.unshift({
      role: 'system',
      content: agent.prompt,
    });

    // Ajouter le nouveau message utilisateur
    basetenMessages.push({
      role: 'user',
      content: userMessage.content,
    });

    // Ajouter un message assistant vide pour le streaming
    const assistantMessageId = messages.length;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      let fullResponse = '';

      await generate(
        basetenMessages,
        {
          max_tokens: 10000,
          temperature: 0.7,
        },
        (chunk) => {
          fullResponse += chunk;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[assistantMessageId + 1] = {
              role: 'assistant',
              content: fullResponse,
            };
            return newMessages;
          });
        }
      );

      // Sauvegarder la session
      await saveSession([...messages, userMessage, { role: 'assistant', content: fullResponse }]);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
      // Retirer le message assistant en erreur
      setMessages((prev) => prev.slice(0, -1));
    }
  }

  async function saveSession(finalMessages: Message[]) {
    try {
      await fetch(`/api/agents/${agentId}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: finalMessages.filter((m) => m.role !== 'system'),
        }),
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  function handleSuggestedQuestion(question: string) {
    setInput(question);
  }

  async function loadSession(sessionId: string) {
    try {
      const response = await fetch(`/api/agents/${agentId}/sessions`);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      const sessions = await response.json();
      const session = sessions.find((s: any) => s.id === sessionId);

      if (session) {
        const sessionMessages = JSON.parse(session.messages);
        setMessages([
          {
            role: 'system',
            content: agent?.prompt || '',
          },
          ...sessionMessages,
        ]);
      }
    } catch (error) {
      console.error('Error loading session:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger la session',
        variant: 'destructive',
      });
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  // Start a new conversation
  function handleNewConversation() {
    if (agent) {
      setMessages([{
        role: 'system',
        content: agent.prompt,
      }]);
      setInput('');
      toast({
        title: 'Nouvelle conversation',
        description: 'La conversation a été réinitialisée',
      });
    }
  }

  // Regenerate last assistant response
  async function handleRegenerateResponse() {
    if (!agent || loading) return;

    // Find the last user message
    const displayMessages = messages.filter(m => m.role !== 'system');
    const lastUserMsgIndex = displayMessages.length - 2; // Before the assistant response

    if (lastUserMsgIndex < 0) return;

    // Remove last assistant message and regenerate
    const newMessages = messages.slice(0, -1);
    setMessages(newMessages);

    const lastUserMessage = displayMessages[lastUserMsgIndex];
    if (lastUserMessage?.role === 'user') {
      setInput(lastUserMessage.content);
      // Auto-send
      setTimeout(() => {
        const inputEl = document.querySelector('input[placeholder="Tapez votre message..."]') as HTMLInputElement;
        if (inputEl) {
          inputEl.form?.dispatchEvent(new Event('submit', { bubbles: true }));
        }
      }, 100);
    }
  }

  // Copy message to clipboard
  async function handleCopyMessage(content: string, index: number) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(index);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      toast({
        title: 'Erreur',
        description: 'Impossible de copier le message',
        variant: 'destructive',
      });
    }
  }

  // Export conversation to markdown
  function handleExportConversation() {
    const displayMessages = messages.filter(m => m.role !== 'system');
    let markdown = `# Conversation avec ${agent?.name}\n\n`;
    markdown += `*Exporté le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}*\n\n---\n\n`;

    displayMessages.forEach((msg) => {
      const role = msg.role === 'user' ? '👤 **Vous**' : `🤖 **${agent?.name}**`;
      markdown += `${role}\n\n${msg.content}\n\n---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${agent?.name}-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export réussi',
      description: 'La conversation a été exportée en Markdown',
    });
  }

  if (loadingAgent) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!agent) {
    return null;
  }

  const suggestedQuestions = getSuggestedQuestions(agent.name);
  const displayMessages = messages.filter((m) => m.role !== 'system');

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0 border-b bg-background">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/assistants')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/dashboard/assistants/${agentId}/history`)}
            >
              <History className="mr-2 h-4 w-4" />
              Historique
            </Button>

            {displayMessages.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNewConversation}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExportConversation}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </>
            )}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1
                  className="text-xl font-bold"
                  style={accentColor ? { color: accentColor } : undefined}
                >
                  {agent.name}
                </h1>
                {agent.context && (
                  <p className="text-sm text-muted-foreground">{agent.context}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="container mx-auto p-6 max-w-4xl">
            {displayMessages.length === 0 ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Questions suggérées ({suggestedQuestions.length} questions)
                    </CardTitle>
                    <CardDescription>
                      Cliquez sur une question pour commencer la conversation. Utilisez les variables [âge], [poids], [taille], [X], [Y], etc. pour personnaliser.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher une question..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <ScrollArea className="h-[500px]">
                      <div className="grid gap-2 pr-4">
                        {suggestedQuestions
                          .filter((question) =>
                            question.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start text-left h-auto py-3 px-4 whitespace-normal"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              <span className="text-sm">{question}</span>
                            </Button>
                          ))}
                        {suggestedQuestions.filter((question) =>
                          question.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              Aucune question trouvée pour "{searchQuery}"
                            </p>
                          )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                {displayMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                        }`}
                      style={
                        message.role === 'user' && accentColor
                          ? { backgroundColor: accentColor, color: 'white' }
                          : undefined
                      }
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-2">
                                  <table className="min-w-full divide-y divide-border" {...props} />
                                </div>
                              ),
                              th: ({ node, ...props }) => (
                                <th className="px-4 py-2 bg-muted text-left font-semibold whitespace-nowrap" {...props} />
                              ),
                              td: ({ node, ...props }) => (
                                <td className="px-4 py-2 border-t border-border whitespace-nowrap" {...props} />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 border-t bg-background p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                style={accentColor ? { backgroundColor: accentColor, color: 'white' } : undefined}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-destructive mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

