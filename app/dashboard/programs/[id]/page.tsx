'use client';


import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Dumbbell, Apple, Loader2, Edit, GripVertical, Clock, Target, Repeat } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface Program {
  id: string;
  name: string;
  description: string | null;
  type: 'SPORT' | 'NUTRITION';
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string | null;
    email: string;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  organization: {
    id: string;
    name: string;
  } | null;
}

interface ParsedExercise {
  name: string;
  exerciseId?: string;
  muscleGroup: string;
  series: number;
  reps: string;
  rest: string;
  notes?: string;
  order: number;
}

const muscleGroupLabels: Record<string, string> = {
  CHEST: 'Pectoraux', BACK: 'Dos', SHOULDERS: 'Épaules', BICEPS: 'Biceps',
  TRICEPS: 'Triceps', FOREARMS: 'Avant-bras', ABS: 'Abdos', OBLIQUES: 'Obliques',
  QUADRICEPS: 'Quadriceps', HAMSTRINGS: 'Ischio-jambiers', GLUTES: 'Fessiers',
  CALVES: 'Mollets', LOWER_BACK: 'Lombaires', TRAPS: 'Trapèzes',
  FULL_BODY: 'Full Body', CARDIO: 'Cardio', STRETCHING: 'Étirements',
};

const muscleGroupColors: Record<string, string> = {
  CHEST: 'bg-red-500', BACK: 'bg-blue-500', SHOULDERS: 'bg-orange-500', BICEPS: 'bg-purple-500',
  TRICEPS: 'bg-pink-500', FOREARMS: 'bg-amber-500', ABS: 'bg-green-500', OBLIQUES: 'bg-lime-500',
  QUADRICEPS: 'bg-cyan-500', HAMSTRINGS: 'bg-teal-500', GLUTES: 'bg-rose-500',
  CALVES: 'bg-sky-500', LOWER_BACK: 'bg-indigo-500', TRAPS: 'bg-violet-500',
  FULL_BODY: 'bg-gray-500', CARDIO: 'bg-red-400', STRETCHING: 'bg-emerald-500',
};

export default function ProgramViewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProgram(params.id as string);
    }
  }, [params.id]);

  async function fetchProgram(id: string) {
    setLoading(true);
    try {
      const response = await fetch(`/api/programs/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: 'Erreur',
            description: 'Programme non trouvé',
            variant: 'destructive',
          });
          router.push('/dashboard');
          return;
        }
        throw new Error('Failed to fetch program');
      }
      const data = await response.json();
      setProgram(data);
    } catch (error) {
      console.error('Error fetching program:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le programme',
        variant: 'destructive',
      });
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  // Parse content to detect JSON with exercises
  const parsedContent = useMemo(() => {
    if (!program) return null;

    try {
      const parsed = JSON.parse(program.content);
      if (parsed.exercises && Array.isArray(parsed.exercises)) {
        return {
          type: 'exercises' as const,
          exercises: parsed.exercises as ParsedExercise[],
        };
      }
      return { type: 'json' as const, data: parsed };
    } catch {
      return { type: 'markdown' as const };
    }
  }, [program?.content]);

  // Group exercises by muscle group
  const groupedExercises = useMemo(() => {
    if (parsedContent?.type !== 'exercises') return null;

    const grouped: Record<string, ParsedExercise[]> = {};
    parsedContent.exercises.forEach((ex) => {
      const group = ex.muscleGroup || 'OTHER';
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(ex);
    });
    return grouped;
  }, [parsedContent]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!program) {
    return null;
  }

  const isSport = program.type === 'SPORT';
  const isOwner = user?.id === program.createdBy.id;

  const ExerciseCard = ({ exercise, index }: { exercise: ParsedExercise; index: number }) => {
    const muscleColor = muscleGroupColors[exercise.muscleGroup] || 'bg-gray-500';

    return (
      <div className="group flex items-start gap-4 p-4 rounded-lg border bg-card hover:border-primary/30 transition-all">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
            {index + 1}
          </div>
          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-lg">{exercise.name}</h4>
            <Badge
              className={`${muscleColor} text-white text-xs`}
            >
              {muscleGroupLabels[exercise.muscleGroup] || exercise.muscleGroup}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Repeat className="h-4 w-4" />
              <span><strong>{exercise.series}</strong> séries × <strong>{exercise.reps}</strong> reps</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Repos: <strong>{exercise.rest}</strong></span>
            </div>
          </div>

          {exercise.notes && (
            <p className="text-sm text-muted-foreground italic">
              📝 {exercise.notes}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!parsedContent) return null;

    // If content is exercises JSON, render exercise cards
    if (parsedContent.type === 'exercises') {
      const totalExercises = parsedContent.exercises.length;
      const totalSets = parsedContent.exercises.reduce((acc, ex) => acc + (ex.series || 0), 0);
      const muscleGroups = [...new Set(parsedContent.exercises.map(ex => ex.muscleGroup))];

      return (
        <div className="space-y-6">
          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalExercises}</p>
              <p className="text-sm text-muted-foreground">Exercices</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalSets}</p>
              <p className="text-sm text-muted-foreground">Séries totales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{muscleGroups.length}</p>
              <p className="text-sm text-muted-foreground">Groupes musculaires</p>
            </div>
          </div>

          {/* Muscle group badges */}
          <div className="flex flex-wrap gap-2">
            {muscleGroups.map((group) => (
              <Badge
                key={group}
                variant="outline"
                className="flex items-center gap-1"
              >
                <Target className="h-3 w-3" />
                {muscleGroupLabels[group] || group}
              </Badge>
            ))}
          </div>

          {/* Exercises grouped by muscle */}
          {groupedExercises && Object.entries(groupedExercises).map(([group, exercises]) => (
            <div key={group} className="space-y-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <div className={`w-3 h-3 rounded-full ${muscleGroupColors[group] || 'bg-gray-500'}`} />
                {muscleGroupLabels[group] || group}
                <Badge variant="secondary" className="text-xs">{exercises.length}</Badge>
              </h3>
              <div className="space-y-2 pl-5">
                {exercises.sort((a, b) => a.order - b.order).map((ex, idx) => (
                  <ExerciseCard key={`${ex.exerciseId || ex.name}-${idx}`} exercise={ex} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Fallback to markdown rendering
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert w-full min-w-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 leading-relaxed" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="ml-4" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold" {...props} />
            ),
            code: ({ node, inline, ...props }: any) => {
              if (inline) {
                return (
                  <code
                    className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  />
                );
              }
              return (
                <code
                  className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4"
                  {...props}
                />
              );
            },
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-primary pl-4 italic my-4"
                {...props}
              />
            ),
            table: ({ node, children, ...props }: any) => {
              return (
                <div
                  className="my-6 w-full overflow-x-auto"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    overflowX: 'auto',
                    display: 'block',
                    width: '100%'
                  }}
                >
                  <table
                    className="border-collapse text-sm border rounded-lg bg-card"
                    style={{
                      width: 'max-content',
                      display: 'table',
                      margin: 0
                    }}
                    {...props}
                  >
                    {children}
                  </table>
                </div>
              );
            },
            thead: ({ node, ...props }: any) => (
              <thead className="bg-muted/50" {...props} />
            ),
            tbody: ({ node, ...props }: any) => (
              <tbody className="divide-y divide-border" {...props} />
            ),
            tr: ({ node, ...props }: any) => (
              <tr className="border-b border-border hover:bg-muted/30 transition-colors" {...props} />
            ),
            th: ({ node, ...props }: any) => (
              <th
                className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap border-b border-border"
                style={{ whiteSpace: 'nowrap' }}
                {...props}
              />
            ),
            td: ({ node, ...props }: any) => (
              <td
                className="px-4 py-2.5 text-foreground border-b border-border/50"
                style={{ whiteSpace: 'nowrap' }}
                {...props}
              />
            ),
          }}
        >
          {program.content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 p-6">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <Button
              variant="ghost"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {isSport ? (
                  <Dumbbell className="h-6 w-6" />
                ) : (
                  <Apple className="h-6 w-6" />
                )}
                <h1 className="text-3xl font-bold">{program.name}</h1>
              </div>
              {program.description && (
                <p className="text-muted-foreground mb-4">{program.description}</p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={isSport ? 'default' : 'secondary'}>
                  {isSport ? 'Sportif' : 'Nutritionnel'}
                </Badge>
                {program.user && (
                  <Badge variant="outline">
                    Pour: {program.user.name || program.user.email}
                  </Badge>
                )}
                {program.organization && (
                  <Badge variant="outline">
                    {program.organization.name}
                  </Badge>
                )}
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/dashboard/programs/${program.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </div>
            )}
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {parsedContent?.type === 'exercises' ? 'Programme d\'entraînement' : 'Contenu du programme'}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Créé le {new Date(program.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {program.updatedAt !== program.createdAt && (
                  <span className="ml-2">
                    (Mis à jour le {new Date(program.updatedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })})
                  </span>
                )}
              </div>
            </div>
            {program.createdBy && (
              <CardDescription>
                Créé par: {program.createdBy.name || program.createdBy.email}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="w-full p-6 min-w-0">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
