'use client';

import { useEffect, useRef } from 'react';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function NotificationsProvider() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const lastMessageIdsRef = useRef<Set<string>>(new Set());
  const lastRequestIdsRef = useRef<Set<string>>(new Set());
  const lastCheckRef = useRef<Date>(new Date(Date.now() - 60000)); // Commencer 1 minute en arrière pour éviter les notifications au chargement

  useEffect(() => {
    if (!user) return;

    // Vérifier toutes les 30 secondes
    const interval = setInterval(() => {
      checkNewMessages();
      if (user.role === 'PRO') {
        checkNewRequests();
      }
    }, 30000); // 30 secondes

    // Vérifier immédiatement après un court délai pour éviter les notifications au chargement initial
    const initialTimeout = setTimeout(() => {
      checkNewMessages();
      if (user.role === 'PRO') {
        checkNewRequests();
      }
    }, 5000); // Attendre 5 secondes après le chargement

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [user]);

  async function checkNewMessages() {
    if (!user) return;

    try {
      // Récupérer tous les chats de l'utilisateur
      const chatsResponse = await fetch('/api/chats');
      if (!chatsResponse.ok) return;

      const chats = await chatsResponse.json();
      
      // Pour chaque chat, vérifier les nouveaux messages
      for (const chat of chats) {
        if (!chat.messages || chat.messages.length === 0) continue;

        // Récupérer le dernier message
        const lastMessage = chat.messages[0];
        
        // Vérifier si c'est un nouveau message (pas envoyé par l'utilisateur et après la dernière vérification)
        if (
          lastMessage.senderId !== user.id &&
          new Date(lastMessage.createdAt) > lastCheckRef.current
        ) {
          // Vérifier si on a déjà notifié ce message
          if (!lastMessageIdsRef.current.has(lastMessage.id)) {
            lastMessageIdsRef.current.add(lastMessage.id);

            // Obtenir le nom de l'expéditeur
            const senderName = lastMessage.sender?.name || lastMessage.sender?.email || 'Quelqu\'un';
            const chatName = chat.name || senderName;

            toast({
              title: 'Nouveau message',
              description: `${senderName} vous a envoyé un message${chat.name ? ` dans ${chatName}` : ''}`,
              onClick: () => router.push(`/dashboard/messaging?chatId=${chat.id}`),
            });
          }
        }
      }

      lastCheckRef.current = new Date();
    } catch (error) {
      console.error('Error checking new messages:', error);
    }
  }

  async function checkNewRequests() {
    if (!user || user.role !== 'PRO') return;

    try {
      // Récupérer toutes les organisations du PRO
      const orgsResponse = await fetch('/api/organizations');
      if (!orgsResponse.ok) return;

      const organizations = await orgsResponse.json();

      // Pour chaque organisation dont le PRO est propriétaire
      for (const org of organizations) {
        if (org.owner.id !== user.id) continue;

        const requestsResponse = await fetch(`/api/organizations/${org.id}/requests`);
        if (!requestsResponse.ok) continue;

        const requests = await requestsResponse.json();
        
        // Filtrer les demandes en attente
        const pendingRequests = requests.filter((req: any) => req.status === 'PENDING');

        // Vérifier s'il y a de nouvelles demandes
        for (const request of pendingRequests) {
          if (
            new Date(request.createdAt) > lastCheckRef.current &&
            !lastRequestIdsRef.current.has(request.id)
          ) {
            lastRequestIdsRef.current.add(request.id);

            const requesterName = request.user?.name || request.user?.email || 'Un utilisateur';

            toast({
              title: 'Nouvelle demande d\'organisation',
              description: `${requesterName} souhaite rejoindre ${org.name}`,
              onClick: () => router.push(`/dashboard/organizations/${org.id}`),
            });
          }
        }
      }
    } catch (error) {
      console.error('Error checking new requests:', error);
    }
  }

  return null; // Ce composant ne rend rien, il gère juste les notifications
}

