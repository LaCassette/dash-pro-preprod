'use client';


import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { Bot, ArrowLeft, Loader2, MessageSquare, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Session {
  id: string;
  title: string | null;
  createdAt: string;
  agent: {
    id: string;
    name: string;
  };
}

export default function AssistantHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { getAccentColor } = useOrganization();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState<{ id: string; name: string } | null>(null);

  const accentColor = getAccentColor(theme === 'dark');
  const agentId = params.id as string;

  useEffect(() => {
    if (user && agentId) {
      fetchAgent();
      fetchSessions();
    }
  }, [user, agentId]);

  async function fetchAgent() {
    try {
      const response = await fetch(`/api/agents/${agentId}`);
      if (!response.ok) throw new Error('Failed to fetch agent');
      const data = await response.json();
      setAgent({ id: data.id, name: data.name });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger l\'assistant',
        variant: 'destructive',
      });
      router.push('/dashboard/assistants');
    }
  }

  async function fetchSessions() {
    try {
      const response = await fetch(`/api/agents/${agentId}/sessions`);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger l\'historique',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSessionClick(sessionId: string) {
    router.push(`/dashboard/assistants/${agentId}/chat?sessionId=${sessionId}`);
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <SidebarTrigger />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/dashboard/assistants/${agentId}/chat`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au chat
        </Button>
      </div>

      <div className="mb-6">
        <h1 
          className="text-3xl font-bold"
          style={accentColor ? { color: accentColor } : undefined}
        >
          Historique des conversations
        </h1>
        <p className="text-muted-foreground">
          {agent && `Avec ${agent.name}`}
        </p>
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Aucune conversation</CardTitle>
            <CardDescription>
              Vous n'avez pas encore de conversations avec cet assistant.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSessionClick(session.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      {session.title || 'Nouvelle conversation'}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(session.createdAt), 'PPpp', { locale: fr })}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSessionClick(session.id);
                    }}
                    style={accentColor ? { color: accentColor } : undefined}
                  >
                    Ouvrir
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

