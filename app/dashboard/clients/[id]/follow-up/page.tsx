'use client';
export const runtime = 'edge';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
    MessageSquare,
    Send,
    Sparkles,
    User,
    UserCheck,
    Clock,
    ChevronLeft,
    Target,
    HelpCircle,
    TrendingUp,
    Loader2,
} from 'lucide-react';

interface CoachingNote {
    id: string;
    content: string;
    noteType: string;
    isFromCoach: boolean;
    createdAt: string;
    coach: { id: number; displayName: string | null; email: string };
    client: { id: number; displayName: string | null; email: string };
}

interface Client {
    id: string;
    name: string | null;
    email: string;
}

const noteTypeIcons: Record<string, React.ReactNode> = {
    GENERAL: <MessageSquare className="h-4 w-4" />,
    FEEDBACK: <TrendingUp className="h-4 w-4" />,
    QUESTION: <HelpCircle className="h-4 w-4" />,
    GOAL: <Target className="h-4 w-4" />,
    PROGRESS: <TrendingUp className="h-4 w-4" />,
};

const noteTypeLabels: Record<string, string> = {
    GENERAL: 'Général',
    FEEDBACK: 'Feedback',
    QUESTION: 'Question',
    GOAL: 'Objectif',
    PROGRESS: 'Progrès',
    NUTRITION: 'Nutrition',
    TRAINING: 'Entraînement',
};

export default function ClientFollowUpPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();
    const clientId = params.id as string;

    const [notes, setNotes] = useState<CoachingNote[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [noteType, setNoteType] = useState<string>('GENERAL');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [activeOrganizationId, setActiveOrganizationId] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!clientId) return;

        try {
            // Get organization for this client
            const orgRes = await fetch('/api/organizations');
            if (orgRes.ok) {
                const orgs = await orgRes.json();
                if (orgs.length > 0) {
                    setActiveOrganizationId(orgs[0].id);

                    // Fetch notes
                    const notesRes = await fetch(`/api/coaching/${orgs[0].id}/notes/${clientId}`);
                    if (notesRes.ok) {
                        const notesData = await notesRes.json();
                        setNotes(notesData);
                    }
                }
            }

            // Get client info
            const clientRes = await fetch(`/api/users/${clientId}`);
            if (clientRes.ok) {
                const clientData = await clientRes.json();
                setClient(clientData);
            }
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible de charger les données',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [clientId, toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSendNote = async () => {
        if (!newNote.trim() || !activeOrganizationId) return;

        setSending(true);
        try {
            const res = await fetch(`/api/coaching/${activeOrganizationId}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientId: parseInt(clientId),
                    content: newNote,
                    noteType,
                }),
            });

            if (!res.ok) throw new Error('Failed to send note');

            const note = await res.json();
            setNotes(prev => [note, ...prev]);
            setNewNote('');

            toast({
                title: 'Note envoyée',
                description: 'Votre note a été ajoutée au suivi',
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'envoyer la note',
                variant: 'destructive',
            });
        } finally {
            setSending(false);
        }
    };

    const handleAnalyzeProgram = async () => {
        if (!activeOrganizationId) return;

        setAnalyzing(true);
        setAnalysis(null);

        try {
            const res = await fetch(`/api/coaching/${activeOrganizationId}/analyze-program`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientId: parseInt(clientId) }),
            });

            if (!res.ok) throw new Error('Failed to analyze');

            const data = await res.json();
            setAnalysis(data.analysis);

            toast({
                title: 'Analyse terminée',
                description: 'La proposition de programme est prête',
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'analyser les échanges',
                variant: 'destructive',
            });
        } finally {
            setAnalyzing(false);
        }
    };

    if (user?.role !== 'PRO') {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Accès refusé</CardTitle>
                        <CardDescription>Cette page est réservée aux professionnels.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            Suivi de {client?.name || client?.email || 'Client'}
                        </h1>
                        <p className="text-muted-foreground">Timeline des échanges et notes de coaching</p>
                    </div>
                </div>
                <Button
                    onClick={handleAnalyzeProgram}
                    disabled={analyzing || notes.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                >
                    {analyzing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Analyser et Proposer Programme
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Timeline Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* New Note Input */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Ajouter une note</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex gap-2">
                                <Select value={noteType} onValueChange={setNoteType}>
                                    <SelectTrigger className="w-[160px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(noteTypeLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                <div className="flex items-center gap-2">
                                                    {noteTypeIcons[value] || <MessageSquare className="h-4 w-4" />}
                                                    {label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Textarea
                                placeholder="Écrivez une note de suivi..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                rows={3}
                            />
                            <Button
                                onClick={handleSendNote}
                                disabled={sending || !newNote.trim()}
                                className="w-full"
                            >
                                {sending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="mr-2 h-4 w-4" />
                                )}
                                Envoyer la note
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Notes Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Timeline du suivi</CardTitle>
                            <CardDescription>{notes.length} note{notes.length !== 1 ? 's' : ''}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : notes.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Aucune note de suivi pour l'instant</p>
                                    <p className="text-sm">Commencez par envoyer une note ci-dessus</p>
                                </div>
                            ) : (
                                <ScrollArea className="h-[500px] pr-4">
                                    <div className="space-y-4">
                                        {notes.map((note) => (
                                            <div
                                                key={note.id}
                                                className={`flex gap-3 ${note.isFromCoach ? '' : 'flex-row-reverse'}`}
                                            >
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${note.isFromCoach
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted'
                                                        }`}
                                                >
                                                    {note.isFromCoach ? (
                                                        <UserCheck className="h-4 w-4" />
                                                    ) : (
                                                        <User className="h-4 w-4" />
                                                    )}
                                                </div>
                                                <div
                                                    className={`flex-1 max-w-[80%] ${note.isFromCoach ? '' : 'text-right'
                                                        }`}
                                                >
                                                    <div
                                                        className={`inline-block p-3 rounded-lg ${note.isFromCoach
                                                                ? 'bg-primary/10 text-left'
                                                                : 'bg-muted text-left'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Badge variant="outline" className="text-xs">
                                                                {noteTypeLabels[note.noteType] || note.noteType}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(note.createdAt).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Analysis Section */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-500" />
                                Analyse IA
                            </CardTitle>
                            <CardDescription>
                                Propositions basées sur les échanges récents
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {analyzing ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
                                    <p className="text-sm text-muted-foreground">Analyse en cours...</p>
                                </div>
                            ) : analysis ? (
                                <ScrollArea className="h-[400px]">
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br>') }} />
                                    </div>
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Cliquez sur "Analyser et Proposer Programme"</p>
                                    <p className="text-sm mt-2">
                                        L'IA analysera les échanges et proposera des modifications au programme
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions rapides</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.push(`/dashboard/clients/${clientId}/measurements`)}
                            >
                                📊 Voir les mensurations
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.push(`/dashboard/clients/${clientId}/sessions`)}
                            >
                                🏋️ Gérer les sessions
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.push(`/dashboard/programs`)}
                            >
                                📋 Voir les programmes
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
