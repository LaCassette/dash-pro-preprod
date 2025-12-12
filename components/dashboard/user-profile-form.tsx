'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
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
import { Loader2, Save } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  type: 'SPORT' | 'NUTRITION' | 'MEDICAL' | 'LIFESTYLE';
  onSuccess?: () => void;
  embedded?: boolean; // Si true, affiche le formulaire sans Dialog
}

// Schéma pour les profils sportifs (sans clientId, name, description)
const sportProfileSchema = z.object({
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

// Schéma pour les profils nutritionnels
const nutritionProfileSchema = z.object({
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

// Schéma pour le profil médical
const medicalProfileSchema = z.object({
  injuries: z.string().optional(),
  conditions: z.string().optional(),
  medications: z.string().optional(),
});

// Schéma pour le profil lifestyle
const lifestyleProfileSchema = z.object({
  occupation: z.string().optional(),
  stressLevel: z.string().optional(),
  sleepHours: z.string().optional(),
  notes: z.string().optional(),
});

type SportProfileData = z.infer<typeof sportProfileSchema>;
type NutritionProfileData = z.infer<typeof nutritionProfileSchema>;
type MedicalProfileData = z.infer<typeof medicalProfileSchema>;
type LifestyleProfileData = z.infer<typeof lifestyleProfileSchema>;

export function UserProfileForm({
  open,
  onOpenChange,
  userId,
  type,
  onSuccess,
  embedded = false,
}: UserProfileFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const isSport = type === 'SPORT';
  const isNutrition = type === 'NUTRITION';
  const isMedical = type === 'MEDICAL';
  const isLifestyle = type === 'LIFESTYLE';

  const schema = isSport
    ? sportProfileSchema
    : isNutrition
      ? nutritionProfileSchema
      : isMedical
        ? medicalProfileSchema
        : lifestyleProfileSchema;

  const form = useForm<SportProfileData | NutritionProfileData | MedicalProfileData | LifestyleProfileData>({
    resolver: zodResolver(schema),
    defaultValues: isSport
      ? {
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
      : isNutrition
        ? {
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
        }
        : isMedical
          ? {
            injuries: '',
            conditions: '',
            medications: '',
          }
          : {
            occupation: '',
            stressLevel: '',
            sleepHours: '',
            notes: '',
          },
  });

  useEffect(() => {
    if ((open || embedded) && userId) {
      fetchProfile();
    }
  }, [open, embedded, userId, type]);

  async function fetchProfile() {
    setLoadingProfile(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile`);
      if (response.ok) {
        const data = await response.json();
        const profileData = isSport
          ? data.sport
          : isNutrition
            ? data.nutrition
            : isMedical
              ? data.medical
              : data.lifestyle;
        if (profileData) {
          form.reset(profileData);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  }

  async function onSubmit(data: SportProfileData | NutritionProfileData | MedicalProfileData | LifestyleProfileData) {
    setLoading(true);
    try {
      // For Sport and Nutrition profiles, synchronize common data
      if ((isSport || isNutrition) && 'age' in data) {
        const commonData = {
          age: data.age,
          gender: data.gender,
          height: data.height,
          weight: data.weight,
        };

        // Récupérer l'autre profil pour synchroniser
        const profileResponse = await fetch(`/api/users/${userId}/profile`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          const otherProfile = isSport ? profileData.nutrition : profileData.sport;

          if (otherProfile) {
            // Mettre à jour l'autre profil avec les données communes
            const updatedOtherProfile = {
              ...otherProfile,
              ...commonData,
            };

            // Sauvegarder l'autre profil mis à jour
            await fetch(`/api/users/${userId}/profile`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                [isSport ? 'nutrition' : 'sport']: updatedOtherProfile,
              }),
            });
          }
        }
      }

      // Determine the profile key
      const profileKey = isSport
        ? 'sport'
        : isNutrition
          ? 'nutrition'
          : isMedical
            ? 'medical'
            : 'lifestyle';

      const response = await fetch(`/api/users/${userId}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [profileKey]: data,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save profile');
      }

      toast({
        title: 'Succès',
        description: 'Profil sauvegardé avec succès',
      });

      onSuccess?.();
      if (!embedded) {
        onOpenChange(false);
      }
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Impossible de sauvegarder le profil',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-6">
            <div className="space-y-6 py-6">
              {loadingProfile ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : isSport ? (
                <SportProfileFields form={form} />
              ) : isNutrition ? (
                <NutritionProfileFields form={form} />
              ) : isMedical ? (
                <MedicalProfileFields form={form} />
              ) : (
                <LifestyleProfileFields form={form} />
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-shrink-0 p-6 border-t bg-background">
          <div className="flex justify-end gap-2">
            {!embedded && (
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={loading || loadingProfile}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder le profil
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] max-h-[95vh] !flex !flex-col !grid-cols-none gap-0 p-0 overflow-hidden">
        <div className="flex-shrink-0 p-6 border-b">
          <DialogHeader>
            <DialogTitle>
              Profil {isSport ? 'sportif' : 'nutritionnel'}
            </DialogTitle>
            <DialogDescription>
              Complétez votre profil pour faciliter la création de programmes personnalisés
            </DialogDescription>
          </DialogHeader>
        </div>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

// Composant partagé pour les informations générales (âge, sexe, taille, poids)
function GeneralInfoFields({ form }: { form: any }) {
  return (
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
                    <RadioGroupItem value="MALE" id="male-general" />
                    <label htmlFor="male-general">Homme</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="female-general" />
                    <label htmlFor="female-general">Femme</label>
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
  );
}

// Composant pour les champs du profil sportif
function SportProfileFields({ form }: { form: any }) {
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
      <GeneralInfoFields form={form} />

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
    </>
  );
}

// Composant pour les champs du profil nutritionnel (similaire mais adapté)
function NutritionProfileFields({ form }: { form: any }) {
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
      <GeneralInfoFields form={form} />

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
    </>
  );
}



// Composant pour les champs du profil médical
function MedicalProfileFields({ form }: { form: any }) {
  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <p className="text-sm text-yellow-900 dark:text-yellow-200">
            🔒 Les données médicales sont chiffrées et sécurisées.
          </p>
        </div>

        <FormField
          control={form.control}
          name="injuries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blessures ou douleurs actuelles</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Décrivez toute blessure ou douleur actuelle..."
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions médicales</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Décrivez toute condition médicale pertinente..."
                  rows={4}
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
                  placeholder="Listez les médicaments pris régulièrement..."
                  rows={4}
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

// Composant pour les champs du profil lifestyle
function LifestyleProfileFields({ form }: { form: any }) {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informations de style de vie</h3>

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Développeur, Enseignant..." />
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
              <FormLabel>Niveau de stress (1-10)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  min="1" 
                  max="10" 
                  placeholder="Ex: 5" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sleepHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heures de sommeil moyennes</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  step="0.5" 
                  placeholder="Ex: 7.5" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes complémentaires</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Toute autre information sur votre style de vie..."
                  rows={4}
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

