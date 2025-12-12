'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBaseten } from '@/hooks/use-baseten';
import { useToast } from '@/hooks/use-toast';
import { useOrganization } from '@/hooks/use-organization';
import { locales, localeNames, Locale } from '@/lib/i18n-config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Loader2, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Client {
  id: string;
  name: string | null;
  email: string;
}

interface ProgramGeneratorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'SPORT' | 'NUTRITION';
  onSuccess?: () => void;
}

// Schéma pour les programmes sportifs
const sportSchema = z.object({
  clientId: z.string().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  // Program customization options
  programLanguage: z.string().optional(),
  programDuration: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  displayFormat: z.enum(['TABLE', 'LIST', 'DETAILED']),
  programLength: z.enum(['SHORT', 'MEDIUM', 'LONG']),
  tone: z.enum(['ENCOURAGING', 'COMPETITIVE', 'NEUTRAL', 'SCIENTIFIC']),
  duplicateFromId: z.string().optional(),
  additionalNotes: z.string().optional(),
  // Informations générales
  age: z.number().min(1).max(120),
  gender: z.enum(['MALE', 'FEMALE']),
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  // Objectifs
  primaryGoal: z.enum([
    'WEIGHT_LOSS',
    'MUSCLE_GAIN',
    'ENDURANCE',
    'STRENGTH',
    'FLEXIBILITY',
    'GENERAL_FITNESS',
    'SPORT_PERFORMANCE',
    'REHABILITATION',
  ]),
  secondaryGoals: z.array(z.string()).optional(),
  // Niveau et expérience
  fitnessLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ELITE']),
  trainingExperience: z.string(),
  // Disponibilité
  daysPerWeek: z.number().min(1).max(7),
  sessionDuration: z.number().min(15).max(180),
  preferredTime: z.enum(['MORNING', 'AFTERNOON', 'EVENING', 'FLEXIBLE']),
  // Équipement
  equipmentAvailable: z.array(z.string()).optional(),
  hasGymAccess: z.boolean(),
  // Contraintes et limitations
  injuries: z.string().optional(),
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  // Préférences
  preferredActivities: z.string().optional(),
  dislikedActivities: z.string().optional(),
  // Autres informations
  currentActivityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE']),
  sleepHours: z.number().min(4).max(12),
  stressLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
  additionalInfo: z.string().optional(),
});

// Schéma pour les programmes nutritionnels
const nutritionSchema = z.object({
  clientId: z.string().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  // Program customization options
  programLanguage: z.string().optional(),
  programDuration: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  displayFormat: z.enum(['TABLE', 'LIST', 'DETAILED']),
  programLength: z.enum(['SHORT', 'MEDIUM', 'LONG']),
  tone: z.enum(['ENCOURAGING', 'COMPETITIVE', 'NEUTRAL', 'SCIENTIFIC']),
  duplicateFromId: z.string().optional(),
  additionalNotes: z.string().optional(),
  // Informations générales
  age: z.number().min(1).max(120),
  gender: z.enum(['MALE', 'FEMALE']),
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  // Objectifs
  primaryGoal: z.enum([
    'WEIGHT_LOSS',
    'WEIGHT_GAIN',
    'MAINTAIN',
    'MUSCLE_GAIN',
    'ENERGY_OPTIMIZATION',
    'DIGESTIVE_HEALTH',
    'SPORT_PERFORMANCE',
    'GENERAL_HEALTH',
  ]),
  secondaryGoals: z.array(z.string()).optional(),
  // Activité physique
  activityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE']),
  trainingFrequency: z.number().min(0).max(7),
  // Alimentation actuelle
  currentDiet: z.enum([
    'OMNIVORE',
    'VEGETARIAN',
    'VEGAN',
    'PESCATARIAN',
    'PALEO',
    'KETO',
    'MEDITERRANEAN',
    'OTHER',
  ]),
  mealsPerDay: z.number().min(1).max(8),
  // Préférences et restrictions
  allergies: z.string().optional(),
  intolerances: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  preferredFoods: z.string().optional(),
  dislikedFoods: z.string().optional(),
  // Habitudes
  cookingSkills: z.enum(['NONE', 'BASIC', 'INTERMEDIATE', 'ADVANCED']),
  mealPrepTime: z.enum(['NONE', 'LOW', 'MODERATE', 'HIGH']),
  eatingOutFrequency: z.enum(['NEVER', 'RARELY', 'OCCASIONALLY', 'OFTEN', 'DAILY']),
  // Santé
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  supplements: z.string().optional(),
  // Autres
  waterIntake: z.number().min(0).max(10),
  sleepHours: z.number().min(4).max(12),
  stressLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
  additionalInfo: z.string().optional(),
});

type SportFormData = z.infer<typeof sportSchema>;
type NutritionFormData = z.infer<typeof nutritionSchema>;

export function ProgramGeneratorForm({
  open,
  onOpenChange,
  type,
  onSuccess,
}: ProgramGeneratorFormProps) {
  const { toast } = useToast();
  const { generate, loading, error, reset } = useBaseten();
  const { activeOrganization } = useOrganization();
  const [clients, setClients] = useState<Client[]>([]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const isSport = type === 'SPORT';
  const schema = isSport ? sportSchema : nutritionSchema;
  const form = useForm<SportFormData | NutritionFormData>({
    resolver: zodResolver(schema),
    defaultValues: isSport
      ? {
        name: '',
        programLanguage: 'fr',
        programDuration: 'WEEKLY',
        displayFormat: 'DETAILED',
        programLength: 'MEDIUM',
        tone: 'ENCOURAGING',
        duplicateFromId: undefined,
        additionalNotes: '',
        age: 30,
        gender: 'MALE',
        height: 175,
        weight: 70,
        primaryGoal: 'GENERAL_FITNESS',
        secondaryGoals: [],
        fitnessLevel: 'BEGINNER',
        trainingExperience: '',
        daysPerWeek: 3,
        sessionDuration: 60,
        preferredTime: 'FLEXIBLE',
        equipmentAvailable: [],
        hasGymAccess: false,
        currentActivityLevel: 'MODERATE',
        sleepHours: 7,
        stressLevel: 'MODERATE',
      }
      : {
        name: '',
        programLanguage: 'fr',
        programDuration: 'WEEKLY',
        displayFormat: 'DETAILED',
        programLength: 'MEDIUM',
        tone: 'ENCOURAGING',
        duplicateFromId: undefined,
        additionalNotes: '',
        age: 30,
        gender: 'MALE',
        height: 175,
        weight: 70,
        primaryGoal: 'GENERAL_HEALTH',
        secondaryGoals: [],
        activityLevel: 'MODERATE',
        trainingFrequency: 3,
        currentDiet: 'OMNIVORE',
        mealsPerDay: 3,
        cookingSkills: 'BASIC',
        mealPrepTime: 'MODERATE',
        eatingOutFrequency: 'OCCASIONALLY',
        waterIntake: 2,
        sleepHours: 7,
        stressLevel: 'MODERATE',
      },
  });

  useEffect(() => {
    if (open && type) {
      fetchClients();
      form.reset();
      setGeneratedContent('');
      reset();
    }
  }, [open, type]);

  async function fetchClients() {
    try {
      const response = await fetch('/api/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  }

  const loadClientProfile = useCallback(async (clientId: string) => {
    try {
      const response = await fetch(`/api/users/${clientId}/profile`);
      if (response.ok) {
        const data = await response.json();
        const profileData = isSport ? data.sport : data.nutrition;

        if (profileData) {
          // Préserver les valeurs du nom et de la description
          const currentName = form.getValues('name');
          const currentDescription = form.getValues('description');

          // Mettre à jour le formulaire avec les données du profil
          Object.keys(profileData).forEach((key) => {
            const value = profileData[key];
            if (value !== undefined && value !== null && value !== '') {
              try {
                form.setValue(key as any, value, { shouldValidate: false });
              } catch (error) {
                console.warn(`Could not set field ${key}:`, error);
              }
            }
          });

          // Restaurer le nom et la description
          if (currentName) {
            form.setValue('name', currentName);
          }
          if (currentDescription) {
            form.setValue('description', currentDescription);
          }

          toast({
            title: 'Profil chargé',
            description: `Les données du profil ${isSport ? 'sportif' : 'nutritionnel'} du client ont été chargées`,
          });
        } else {
          toast({
            title: 'Aucun profil',
            description: `Le client n'a pas encore de profil ${isSport ? 'sportif' : 'nutritionnel'}`,
            variant: 'default',
          });
        }
      } else {
        throw new Error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading client profile:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le profil du client',
        variant: 'destructive',
      });
    }
  }, [form, isSport, toast]);

  // Charger le profil du client sélectionné
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'clientId') {
        const clientId = value.clientId;
        if (clientId && clientId !== 'none' && clientId !== undefined) {
          loadClientProfile(clientId);
        } else if (clientId === 'none' || !clientId) {
          // Réinitialiser le formulaire si aucun client n'est sélectionné
          form.reset();
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, loadClientProfile]);

  async function onSubmit(data: SportFormData | NutritionFormData) {
    setIsGenerating(true);
    setGeneratedContent('');

    try {
      // Construire le prompt pour l'IA
      const prompt = buildPrompt(data, type);

      const content = await generate(
        [
          {
            role: 'system',
            content: isSport
              ? 'Tu es un coach sportif professionnel expert. Crée des programmes d\'entraînement détaillés, personnalisés et progressifs.'
              : 'Tu es un nutritionniste professionnel expert. Crée des programmes nutritionnels détaillés, personnalisés et équilibrés.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        {
          max_tokens: 10000, // Limite Baseten: 3000 tokens, on garde une marge
          temperature: 0.7,
        },
        (chunk) => {
          setGeneratedContent((prev) => prev + chunk);
        }
      );

      setGeneratedContent(content);
    } catch (err) {
      toast({
        title: 'Erreur',
        description: error || 'Impossible de générer le programme',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveProgram() {
    if (!generatedContent) {
      toast({
        title: 'Erreur',
        description: 'Aucun contenu généré à sauvegarder',
        variant: 'destructive',
      });
      return;
    }

    const formData = form.getValues();
    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || undefined,
          type,
          content: generatedContent,
          userId: formData.clientId || undefined,
          organizationId: activeOrganization?.id || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save program');
      }

      toast({
        title: 'Succès',
        description: 'Programme créé avec succès',
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Impossible de sauvegarder le programme',
        variant: 'destructive',
      });
    }
  }

  // Fonction pour tronquer les textes longs pour respecter la limite de 3000 tokens
  function truncateText(text: string, maxLength: number = 200): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  function buildPrompt(data: SportFormData | NutritionFormData, programType: 'SPORT' | 'NUTRITION'): string {
    // Map customization options to readable format
    const durationMap = { DAILY: 'journée', WEEKLY: 'semaine', MONTHLY: 'mois' };
    const formatMap = { TABLE: 'sous forme de tableaux', LIST: 'sous forme de listes', DETAILED: 'format détaillé avec explications' };
    const lengthMap = { SHORT: 'court et concis', MEDIUM: 'longueur moyenne', LONG: 'détaillé et complet' };
    const toneMap = { ENCOURAGING: 'encourageant et motivant', COMPETITIVE: 'compétitif et ambitieux', NEUTRAL: 'neutre et factuel', SCIENTIFIC: 'scientifique et technique' };
    const langMap: Record<string, string> = { fr: 'français', en: 'anglais', es: 'espagnol', it: 'italien', de: 'allemand', pt: 'portugais', ja: 'japonais', zh: 'chinois', ru: 'russe', ar: 'arabe' };

    const customization = `
FORMAT:
- Langue: ${langMap[data.programLanguage || 'fr'] || data.programLanguage}
- Durée programme: ${durationMap[data.programDuration]}
- Format d'affichage: ${formatMap[data.displayFormat]}
- Longueur: ${lengthMap[data.programLength]}
- Ton: ${toneMap[data.tone]}
${data.additionalNotes ? `- Notes complémentaires: ${truncateText(data.additionalNotes, 200)}` : ''}`;

    if (programType === 'SPORT') {
      const d = data as SportFormData;
      return `Crée un programme d'entraînement personnalisé en markdown.
${customization}

INFOS:
- ${d.age} ans, ${d.gender}, ${d.height}cm, ${d.weight}kg
- Objectif: ${d.primaryGoal}${d.secondaryGoals?.length ? `, ${d.secondaryGoals.slice(0, 2).join(', ')}` : ''}
- Niveau: ${d.fitnessLevel}, Expérience: ${truncateText(d.trainingExperience, 100)}
- ${d.daysPerWeek}j/sem, ${d.sessionDuration}min, ${d.preferredTime}
- Salle: ${d.hasGymAccess ? 'Oui' : 'Non'}${d.equipmentAvailable?.length ? `, Équip: ${d.equipmentAvailable.slice(0, 3).join(', ')}` : ''}
${d.injuries ? `- Blessures: ${truncateText(d.injuries, 100)}` : ''}
${d.medicalConditions ? `- Médical: ${truncateText(d.medicalConditions, 100)}` : ''}
${d.preferredActivities ? `- Préféré: ${truncateText(d.preferredActivities, 100)}` : ''}
- Activité: ${d.currentActivityLevel}, Sommeil: ${d.sleepHours}h, Stress: ${d.stressLevel}

Crée un programme détaillé en markdown avec sections, exercices, séries, répétitions, et progression.`;
    } else {
      const d = data as NutritionFormData;
      return `Crée un programme nutritionnel personnalisé en markdown.
${customization}

INFOS:
- ${d.age} ans, ${d.gender}, ${d.height}cm, ${d.weight}kg
- Objectif: ${d.primaryGoal}${d.secondaryGoals?.length ? `, ${d.secondaryGoals.slice(0, 2).join(', ')}` : ''}
- Activité: ${d.activityLevel}, ${d.trainingFrequency}x/sem
- Régime: ${d.currentDiet}, ${d.mealsPerDay} repas/j
${d.allergies ? `- Allergies: ${truncateText(d.allergies, 100)}` : ''}
${d.intolerances ? `- Intolérances: ${truncateText(d.intolerances, 100)}` : ''}
${d.dietaryRestrictions ? `- Restrictions: ${truncateText(d.dietaryRestrictions, 100)}` : ''}
${d.preferredFoods ? `- Préférés: ${truncateText(d.preferredFoods, 100)}` : ''}
- Cuisine: ${d.cookingSkills}, Prépa: ${d.mealPrepTime}, Resto: ${d.eatingOutFrequency}
${d.medicalConditions ? `- Médical: ${truncateText(d.medicalConditions, 100)}` : ''}
- Eau: ${d.waterIntake}L/j, Sommeil: ${d.sleepHours}h, Stress: ${d.stressLevel}

Crée un programme détaillé en markdown avec repas, portions, recettes et conseils.`;
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] max-h-[95vh] !flex !flex-col !grid-cols-none gap-0 p-0 overflow-hidden">
        <div className="flex-shrink-0 p-6 border-b">
          <DialogHeader>
            <DialogTitle>
              Générer un programme {isSport ? 'sportif' : 'nutritionnel'}
            </DialogTitle>
            <DialogDescription>
              Remplissez le formulaire pour générer un programme personnalisé avec l'IA
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-6">
                <div className="space-y-6 py-6">
                  {/* Informations de base */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations de base</h3>

                    <FormField
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client (optionnel)</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === 'none' ? undefined : value)}
                            value={field.value || 'none'}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un client" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Aucun client spécifique</SelectItem>
                              {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
                                  {client.name || client.email}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du programme *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ex: Programme perte de poids" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Description du programme"
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Options de personnalisation du programme */}
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
                    <h3 className="text-lg font-semibold">🎨 Personnalisation du programme</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="programLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Langue du programme</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || 'fr'}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une langue" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locales.map((locale) => (
                                  <SelectItem key={locale} value={locale}>
                                    {localeNames[locale]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="programDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de durée</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="DAILY">Journalier</SelectItem>
                                <SelectItem value="WEEKLY">Hebdomadaire</SelectItem>
                                <SelectItem value="MONTHLY">Mensuel</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="displayFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Format d'affichage</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="TABLE">📊 Tableaux</SelectItem>
                                <SelectItem value="LIST">📝 Listes</SelectItem>
                                <SelectItem value="DETAILED">📖 Détaillé</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="programLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longueur</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SHORT">Court</SelectItem>
                                <SelectItem value="MEDIUM">Moyen</SelectItem>
                                <SelectItem value="LONG">Complet</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ton</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ENCOURAGING">💪 Encourageant</SelectItem>
                                <SelectItem value="COMPETITIVE">🏆 Compétitif</SelectItem>
                                <SelectItem value="NEUTRAL">⚖️ Neutre</SelectItem>
                                <SelectItem value="SCIENTIFIC">🔬 Scientifique</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes complémentaires</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Ajoutez des instructions ou notes spécifiques à prendre en compte..."
                              rows={2}
                            />
                          </FormControl>
                          <FormDescription>
                            Ces notes seront prises en compte lors de la génération
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Informations générales */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations générales</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Âge *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sexe biologique *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="MALE" id="male" />
                                  <label htmlFor="male">Homme</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="FEMALE" id="female" />
                                  <label htmlFor="female">Femme</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Taille (cm) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poids (kg) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Champs spécifiques selon le type */}
                  {isSport ? (
                    <SportSpecificFields form={form} />
                  ) : (
                    <NutritionSpecificFields form={form} />
                  )}

                  {/* Informations supplémentaires communes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations supplémentaires</h3>

                    <FormField
                      control={form.control}
                      name="sleepHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heures de sommeil par nuit: {field.value}h</FormLabel>
                          <FormControl>
                            <Slider
                              min={4}
                              max={12}
                              step={0.5}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stressLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Niveau de stress *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="LOW">Faible</SelectItem>
                                <SelectItem value="MODERATE">Modéré</SelectItem>
                                <SelectItem value="HIGH">Élevé</SelectItem>
                                <SelectItem value="VERY_HIGH">Très élevé</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Informations complémentaires</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Toute autre information pertinente..."
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Contenu généré */}
            {generatedContent && (
              <div className="flex-shrink-0 px-6 py-4 border-t bg-muted/50">
                <h3 className="text-lg font-semibold mb-2">Programme généré</h3>
                <ScrollArea className="h-64 w-full rounded-md border bg-background p-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="text-lg font-semibold mt-3 mb-2" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="text-base font-semibold mt-2 mb-1" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-2 leading-relaxed text-sm" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc list-inside mb-2 space-y-1 text-sm" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal list-inside mb-2 space-y-1 text-sm" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="ml-2 text-sm" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold" {...props} />
                        ),
                        code: ({ node, inline, ...props }: any) => {
                          if (inline) {
                            return (
                              <code
                                className="bg-muted px-1 py-0.5 rounded text-xs font-mono"
                                {...props}
                              />
                            );
                          }
                          return (
                            <code
                              className="block bg-muted p-2 rounded text-xs font-mono overflow-x-auto mb-2"
                              {...props}
                            />
                          );
                        },
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-2 border-primary pl-2 italic my-2 text-sm"
                            {...props}
                          />
                        ),
                        table: ({ node, children, ...props }: any) => {
                          return (
                            <div
                              className="my-3 w-full overflow-x-auto"
                              style={{
                                WebkitOverflowScrolling: 'touch',
                                overflowX: 'auto',
                                display: 'block',
                                width: '100%'
                              }}
                            >
                              <table
                                className="border-collapse text-xs border rounded bg-card"
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
                            className="px-2 py-1.5 text-left font-semibold text-foreground whitespace-nowrap border-b border-border text-xs"
                            style={{ whiteSpace: 'nowrap' }}
                            {...props}
                          />
                        ),
                        td: ({ node, ...props }: any) => (
                          <td
                            className="px-2 py-1 text-foreground border-b border-border/50 text-xs"
                            style={{ whiteSpace: 'nowrap' }}
                            {...props}
                          />
                        ),
                      }}
                    >
                      {generatedContent}
                    </ReactMarkdown>
                  </div>
                </ScrollArea>
              </div>
            )}

            <div className="flex-shrink-0 p-6 border-t bg-background">
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading || isGenerating}
                >
                  Annuler
                </Button>
                {generatedContent && (
                  <Button
                    type="button"
                    onClick={handleSaveProgram}
                    disabled={loading || isGenerating}
                  >
                    Sauvegarder le programme
                  </Button>
                )}
                <Button type="submit" disabled={loading || isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Générer le programme
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Composant pour les champs spécifiques aux programmes sportifs
function SportSpecificFields({ form }: { form: any }) {
  const equipmentOptions = [
    'Haltères',
    'Barre',
    'Kettlebell',
    'Élastiques',
    'TRX',
    'Ballon de stabilité',
    'Matelas',
    'Vélo',
    'Tapis de course',
    'Rameur',
  ];

  const goalOptions = [
    { value: 'WEIGHT_LOSS', label: 'Perte de poids' },
    { value: 'MUSCLE_GAIN', label: 'Prise de masse musculaire' },
    { value: 'ENDURANCE', label: 'Endurance' },
    { value: 'STRENGTH', label: 'Force' },
    { value: 'FLEXIBILITY', label: 'Flexibilité' },
    { value: 'GENERAL_FITNESS', label: 'Forme générale' },
    { value: 'SPORT_PERFORMANCE', label: 'Performance sportive' },
    { value: 'REHABILITATION', label: 'Rééducation' },
  ];

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Objectifs</h3>

        <FormField
          control={form.control}
          name="primaryGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif principal *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Niveau et expérience</h3>

        <FormField
          control={form.control}
          name="fitnessLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau de forme *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Débutant</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermédiaire</SelectItem>
                    <SelectItem value="ADVANCED">Avancé</SelectItem>
                    <SelectItem value="ELITE">Élite</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trainingExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expérience d'entraînement *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Décrivez votre expérience avec le sport et l'entraînement..."
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Disponibilité</h3>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="daysPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jours par semaine: {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={7}
                    step={1}
                    value={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sessionDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durée des séances: {field.value} min</FormLabel>
                <FormControl>
                  <Slider
                    min={15}
                    max={180}
                    step={5}
                    value={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moment préféré *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MORNING">Matin</SelectItem>
                    <SelectItem value="AFTERNOON">Après-midi</SelectItem>
                    <SelectItem value="EVENING">Soir</SelectItem>
                    <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Équipement</h3>

        <FormField
          control={form.control}
          name="hasGymAccess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accès à une salle de sport</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipmentAvailable"
          render={() => (
            <FormItem>
              <FormLabel>Équipement disponible</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {equipmentOptions.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="equipmentAvailable"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item])
                                  : field.onChange(
                                    field.value?.filter((value: string) => value !== item)
                                  );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contraintes et limitations</h3>

        <FormField
          control={form.control}
          name="injuries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blessures ou douleurs actuelles</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Décrivez toute blessure ou douleur..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medicalConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions médicales</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Décrivez toute condition médicale pertinente..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médicaments</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Listez les médicaments pris..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Préférences</h3>

        <FormField
          control={form.control}
          name="preferredActivities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activités préférées</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ex: Course, musculation, yoga..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dislikedActivities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activités non appréciées</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ex: Natation, sports d'équipe..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentActivityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau d'activité actuel *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEDENTARY">Sédentaire</SelectItem>
                    <SelectItem value="LIGHT">Léger</SelectItem>
                    <SelectItem value="MODERATE">Modéré</SelectItem>
                    <SelectItem value="ACTIVE">Actif</SelectItem>
                    <SelectItem value="VERY_ACTIVE">Très actif</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

// Composant pour les champs spécifiques aux programmes nutritionnels
function NutritionSpecificFields({ form }: { form: any }) {
  const goalOptions = [
    { value: 'WEIGHT_LOSS', label: 'Perte de poids' },
    { value: 'WEIGHT_GAIN', label: 'Prise de poids' },
    { value: 'MAINTAIN', label: 'Maintien du poids' },
    { value: 'MUSCLE_GAIN', label: 'Prise de masse musculaire' },
    { value: 'ENERGY_OPTIMIZATION', label: 'Optimisation de l\'énergie' },
    { value: 'DIGESTIVE_HEALTH', label: 'Santé digestive' },
    { value: 'SPORT_PERFORMANCE', label: 'Performance sportive' },
    { value: 'GENERAL_HEALTH', label: 'Santé générale' },
  ];

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Objectifs</h3>

        <FormField
          control={form.control}
          name="primaryGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif principal *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Activité physique</h3>

        <FormField
          control={form.control}
          name="activityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau d'activité *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEDENTARY">Sédentaire</SelectItem>
                    <SelectItem value="LIGHT">Léger</SelectItem>
                    <SelectItem value="MODERATE">Modéré</SelectItem>
                    <SelectItem value="ACTIVE">Actif</SelectItem>
                    <SelectItem value="VERY_ACTIVE">Très actif</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trainingFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fréquence d'entraînement: {field.value} fois/semaine</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={7}
                  step={1}
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alimentation actuelle</h3>

        <FormField
          control={form.control}
          name="currentDiet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Régime actuel *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OMNIVORE">Omnivore</SelectItem>
                    <SelectItem value="VEGETARIAN">Végétarien</SelectItem>
                    <SelectItem value="VEGAN">Végétalien</SelectItem>
                    <SelectItem value="PESCATARIAN">Pescétarien</SelectItem>
                    <SelectItem value="PALEO">Paléo</SelectItem>
                    <SelectItem value="KETO">Cétogène</SelectItem>
                    <SelectItem value="MEDITERRANEAN">Méditerranéen</SelectItem>
                    <SelectItem value="OTHER">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mealsPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repas par jour: {field.value}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={8}
                  step={1}
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Préférences et restrictions</h3>

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Listez les allergies alimentaires..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="intolerances"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intolérances</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Listez les intolérances alimentaires..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restrictions alimentaires</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ex: Pas de gluten, pas de produits laitiers..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredFoods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aliments préférés</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ex: Poulet, légumes verts, fruits..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dislikedFoods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aliments non appréciés</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ex: Brocoli, poisson..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Habitudes</h3>

        <FormField
          control={form.control}
          name="cookingSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compétences culinaires *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">Aucune</SelectItem>
                    <SelectItem value="BASIC">Basiques</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermédiaires</SelectItem>
                    <SelectItem value="ADVANCED">Avancées</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mealPrepTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temps pour la préparation *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">Aucun</SelectItem>
                    <SelectItem value="LOW">Faible (15-30 min)</SelectItem>
                    <SelectItem value="MODERATE">Modéré (30-60 min)</SelectItem>
                    <SelectItem value="HIGH">Élevé (60+ min)</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eatingOutFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fréquence de repas au restaurant *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEVER">Jamais</SelectItem>
                    <SelectItem value="RARELY">Rarement</SelectItem>
                    <SelectItem value="OCCASIONALLY">Occasionnellement</SelectItem>
                    <SelectItem value="OFTEN">Souvent</SelectItem>
                    <SelectItem value="DAILY">Quotidiennement</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Santé</h3>

        <FormField
          control={form.control}
          name="medicalConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions médicales</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Décrivez toute condition médicale pertinente..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médicaments</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Listez les médicaments pris..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supplements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compléments alimentaires</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Listez les compléments pris..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="waterIntake"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consommation d'eau: {field.value}L/jour</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={10}
                  step={0.5}
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

