'use client';
export const runtime = 'edge';

'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Plus, Sparkles, Search, Filter, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AssistantCard } from '@/components/dashboard/assistant-card';
import { specialtyNames, specialtyColors, AgentSpecialty } from '@/lib/default-agents';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Agent {
  id: string;
  name: string;
  image: string | null;
  prompt: string;
  context: string | null;
  profileUser: {
    id: string;
    name: string | null;
    email: string;
    picture: string | null;
  } | null;
  _count: {
    sessions: number;
  };
}

export default function AssistantsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<Set<AgentSpecialty>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (user?.role === 'PRO') {
      fetchAgents();
    }
  }, [user]);

  async function fetchAgents() {
    try {
      const response = await fetch('/api/agents');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les assistants',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function initDefaultAgents() {
    setInitLoading(true);
    try {
      const response = await fetch('/api/agents/init', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to init');
      const data = await response.json();
      toast({
        title: 'Succès',
        description: data.message || 'Agents créés avec succès',
      });
      fetchAgents();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer les agents',
        variant: 'destructive',
      });
    } finally {
      setInitLoading(false);
    }
  }

  async function deleteAgent(agentId: string) {
    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      toast({
        title: 'Succès',
        description: 'Assistant supprimé',
      });
      fetchAgents();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'assistant',
        variant: 'destructive',
      });
    }
  }

  // Detect specialty from agent context
  function getAgentSpecialty(agent: Agent): AgentSpecialty | null {
    const text = `${agent.name} ${agent.context || ''}`.toLowerCase();
    if (text.includes('yoga') || text.includes('méditation')) return 'YOGA';
    if (text.includes('kiné') || text.includes('rééducation') || text.includes('blessure')) return 'KINESITHERAPY';
    if (text.includes('mental') || text.includes('psycho')) return 'MENTAL';
    if (text.includes('musculation') || text.includes('force') || text.includes('masse')) return 'STRENGTH';
    if (text.includes('pilates') || text.includes('core') || text.includes('postur')) return 'PILATES';
    if (text.includes('running') || text.includes('course') || text.includes('marathon') || text.includes('endurance')) return 'RUNNING';
    if (text.includes('programme') || text.includes('personnalisé') || text.includes('coach sportif')) return 'PROGRAM_DESIGN';
    if (text.includes('cardio') || text.includes('hiit') || text.includes('fitness')) return 'CARDIO';
    if (text.includes('combat') || text.includes('boxe') || text.includes('frappe')) return 'COMBAT';
    if (text.includes('nutrition') || text.includes('alimenta') || text.includes('repas')) return 'NUTRITION';
    return null;
  }

  // Filter agents based on search and specialty
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = searchQuery === '' ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agent.context?.toLowerCase().includes(searchQuery.toLowerCase()));

    const specialty = getAgentSpecialty(agent);
    const matchesSpecialty = selectedSpecialties.size === 0 ||
      (specialty && selectedSpecialties.has(specialty));

    return matchesSearch && matchesSpecialty;
  });

  const toggleSpecialty = (specialty: AgentSpecialty) => {
    setSelectedSpecialties(prev => {
      const next = new Set(prev);
      if (next.has(specialty)) {
        next.delete(specialty);
      } else {
        next.add(specialty);
      }
      return next;
    });
  };

  if (user?.role !== 'PRO') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Cette page est réservée aux professionnels.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Mes Assistants IA
          </h1>
          <p className="text-muted-foreground">
            {agents.length} assistant{agents.length !== 1 ? 's' : ''} personnalisé{agents.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={initDefaultAgents}
            variant="outline"
            disabled={initLoading}
          >
            {initLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {agents.length === 0 ? 'Créer 10 Experts' : 'Ajouter Nouveaux Experts'}
          </Button>
          <CreateAgentDialog
            open={open}
            onOpenChange={setOpen}
            onSuccess={fetchAgents}
          />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un assistant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Spécialités
              {selectedSpecialties.size > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedSpecialties.size}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {(Object.keys(specialtyNames) as AgentSpecialty[]).map((specialty) => (
              <DropdownMenuCheckboxItem
                key={specialty}
                checked={selectedSpecialties.has(specialty)}
                onCheckedChange={() => toggleSpecialty(specialty)}
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: specialtyColors[specialty] }}
                />
                {specialtyNames[specialty]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedSpecialties.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedSpecialties(new Set())}
          >
            Effacer filtres
          </Button>
        )}
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAgents.map((agent) => (
            <AssistantCard
              key={agent.id}
              agent={agent}
              onChat={(id) => router.push(`/dashboard/assistants/${id}/chat`)}
              onHistory={(id) => router.push(`/dashboard/assistants/${id}/history`)}
              onDelete={deleteAgent}
            />
          ))}

          {filteredAgents.length === 0 && agents.length > 0 && (
            <div className="col-span-full">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Aucun assistant ne correspond à votre recherche
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSpecialties(new Set());
                    }}
                  >
                    Effacer les filtres
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {agents.length === 0 && (
            <div className="col-span-full">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun assistant</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Créez vos premiers assistants IA experts pour accompagner vos clients
                  </p>
                  <Button onClick={initDefaultAgents} disabled={initLoading}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Créer 10 Assistants Experts
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CreateAgentDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, prompt, context: context || null }),
      });

      if (!response.ok) throw new Error('Failed to create');
      toast({
        title: 'Succès',
        description: 'Assistant créé avec succès',
      });
      setName('');
      setPrompt('');
      setContext('');
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer l\'assistant',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Créer un assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer un assistant</DialogTitle>
          <DialogDescription>
            Créez un assistant IA personnalisé pour vos clients
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom de l'assistant"
              required
            />
          </div>
          <div>
            <Label htmlFor="context">Contexte (optionnel)</Label>
            <Input
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Contexte de l'assistant"
            />
          </div>
          <div>
            <Label htmlFor="prompt">Prompt système</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez le rôle et le comportement de l'assistant..."
              rows={6}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              Créer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
