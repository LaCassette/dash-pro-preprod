'use client';
export const runtime = 'edge';

'use client';


import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Activity, Scale, Heart, Ruler, Target } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Formules de calcul
function calculateBMR(weight: number, height: number, age: number, gender: 'M' | 'F'): number {
  // Formule de Black et al.
  // BMR pour les hommes = 259 × (Poids^0.48) × (Taille^0.50) × (âge^−0.13)
  // BMR pour les femmes = 230 × (Poids^0.48) × (Taille^0.50) × (âge^−0.13)
  const coefficient = gender === 'M' ? 259 : 230;
  return coefficient * Math.pow(weight, 0.48) * Math.pow(height, 0.50) * Math.pow(age, -0.13);
}

function calculateIMC(weight: number, height: number): number {
  // IMC = poids (kg) / (taille (m))²
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

function getIMCCategory(imc: number): { label: string; color: string } {
  if (imc < 18.5) return { label: 'Insuffisance pondérale', color: 'text-blue-500' };
  if (imc < 25) return { label: 'Poids normal', color: 'text-green-500' };
  if (imc < 30) return { label: 'Surpoids', color: 'text-yellow-500' };
  if (imc < 35) return { label: 'Obésité modérée', color: 'text-orange-500' };
  if (imc < 40) return { label: 'Obésité sévère', color: 'text-red-500' };
  return { label: 'Obésité morbide', color: 'text-red-700' };
}

function calculateIMG(weight: number, height: number, age: number, gender: 'M' | 'F'): number {
  // Formule de Deurenberg
  const imc = calculateIMC(weight, height);
  if (gender === 'M') {
    return (1.20 * imc) + (0.23 * age) - 16.2;
  } else {
    return (1.20 * imc) + (0.23 * age) - 5.4;
  }
}

function getIMGCategory(img: number, gender: 'M' | 'F'): { label: string; color: string } {
  if (gender === 'M') {
    if (img < 10) return { label: 'Trop maigre', color: 'text-blue-500' };
    if (img < 20) return { label: 'Normal', color: 'text-green-500' };
    if (img < 25) return { label: 'Surpoids', color: 'text-yellow-500' };
    return { label: 'Obésité', color: 'text-red-500' };
  } else {
    if (img < 20) return { label: 'Trop maigre', color: 'text-blue-500' };
    if (img < 30) return { label: 'Normal', color: 'text-green-500' };
    if (img < 35) return { label: 'Surpoids', color: 'text-yellow-500' };
    return { label: 'Obésité', color: 'text-red-500' };
  }
}

function calculateRTH(waist: number, hip: number): number {
  // Ratio Taille/Hanche
  return waist / hip;
}

function getRTHCategory(rth: number, gender: 'M' | 'F'): { label: string; color: string } {
  if (gender === 'M') {
    if (rth < 0.9) return { label: 'Risque faible', color: 'text-green-500' };
    if (rth < 1.0) return { label: 'Risque modéré', color: 'text-yellow-500' };
    return { label: 'Risque élevé', color: 'text-red-500' };
  } else {
    if (rth < 0.8) return { label: 'Risque faible', color: 'text-green-500' };
    if (rth < 0.85) return { label: 'Risque modéré', color: 'text-yellow-500' };
    return { label: 'Risque élevé', color: 'text-red-500' };
  }
}

function calculateIdealWeightLorentz(height: number, gender: 'M' | 'F'): number {
  // Formule de Lorentz
  if (gender === 'M') {
    return height - 100 - ((height - 150) / 4);
  } else {
    return height - 100 - ((height - 150) / 2.5);
  }
}

export default function CalculatorsPage() {
  const { user } = useUser();
  const { getAccentColor } = useOrganization();
  const { theme } = useTheme();
  const accentColor = getAccentColor(theme === 'dark');

  // États pour chaque calculateur
  const [bmrData, setBmrData] = useState({ weight: '', height: '', age: '', gender: 'M' as 'M' | 'F' });
  const [imcData, setImcData] = useState({ weight: '', height: '' });
  const [imgData, setImgData] = useState({ weight: '', height: '', age: '', gender: 'M' as 'M' | 'F' });
  const [rthData, setRthData] = useState({ waist: '', hip: '', gender: 'M' as 'M' | 'F' });
  const [idealWeightData, setIdealWeightData] = useState({ height: '', gender: 'M' as 'M' | 'F' });

  // Résultats
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [imcResult, setImcResult] = useState<number | null>(null);
  const [imgResult, setImgResult] = useState<number | null>(null);
  const [rthResult, setRthResult] = useState<number | null>(null);
  const [idealWeightResult, setIdealWeightResult] = useState<number | null>(null);

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

  function handleBMRCalculate() {
    const weight = parseFloat(bmrData.weight);
    const height = parseFloat(bmrData.height);
    const age = parseFloat(bmrData.age);

    if (weight > 0 && height > 0 && age > 0) {
      const bmr = calculateBMR(weight, height, age, bmrData.gender);
      setBmrResult(bmr);
    }
  }

  function handleIMCCalculate() {
    const weight = parseFloat(imcData.weight);
    const height = parseFloat(imcData.height);

    if (weight > 0 && height > 0) {
      const imc = calculateIMC(weight, height);
      setImcResult(imc);
    }
  }

  function handleIMGCalculate() {
    const weight = parseFloat(imgData.weight);
    const height = parseFloat(imgData.height);
    const age = parseFloat(imgData.age);

    if (weight > 0 && height > 0 && age > 0) {
      const img = calculateIMG(weight, height, age, imgData.gender);
      setImgResult(img);
    }
  }

  function handleRTHCalculate() {
    const waist = parseFloat(rthData.waist);
    const hip = parseFloat(rthData.hip);

    if (waist > 0 && hip > 0) {
      const rth = calculateRTH(waist, hip);
      setRthResult(rth);
    }
  }

  function handleIdealWeightCalculate() {
    const height = parseFloat(idealWeightData.height);

    if (height > 0) {
      const idealWeight = calculateIdealWeightLorentz(height, idealWeightData.gender);
      setIdealWeightResult(idealWeight);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
      </div>
      <div className="mb-6">
        <h1
          className="text-3xl font-bold"
          style={accentColor ? { color: accentColor } : undefined}
        >
          Calcul chronophage
        </h1>
        <p className="text-muted-foreground">
          Calculateurs de santé et de forme physique
        </p>
      </div>

      <Tabs defaultValue="bmr" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="bmr">
            <Activity className="mr-2 h-4 w-4" />
            BMR
          </TabsTrigger>
          <TabsTrigger value="imc">
            <Scale className="mr-2 h-4 w-4" />
            IMC
          </TabsTrigger>
          <TabsTrigger value="img">
            <Heart className="mr-2 h-4 w-4" />
            IMG
          </TabsTrigger>
          <TabsTrigger value="rth">
            <Ruler className="mr-2 h-4 w-4" />
            RTH
          </TabsTrigger>
          <TabsTrigger value="ideal">
            <Target className="mr-2 h-4 w-4" />
            Poids Idéal
          </TabsTrigger>
        </TabsList>

        {/* BMR */}
        <TabsContent value="bmr">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur BMR (Métabolisme de Base)</CardTitle>
              <CardDescription>
                Calculez votre métabolisme de base avec la formule de Black et al.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="bmr-weight">Poids (kg)</Label>
                  <Input
                    id="bmr-weight"
                    type="number"
                    value={bmrData.weight}
                    onChange={(e) => setBmrData({ ...bmrData, weight: e.target.value })}
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label htmlFor="bmr-height">Taille (cm)</Label>
                  <Input
                    id="bmr-height"
                    type="number"
                    value={bmrData.height}
                    onChange={(e) => setBmrData({ ...bmrData, height: e.target.value })}
                    placeholder="175"
                  />
                </div>
                <div>
                  <Label htmlFor="bmr-age">Âge (années)</Label>
                  <Input
                    id="bmr-age"
                    type="number"
                    value={bmrData.age}
                    onChange={(e) => setBmrData({ ...bmrData, age: e.target.value })}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="bmr-gender">Sexe</Label>
                  <Select
                    value={bmrData.gender}
                    onValueChange={(value) => setBmrData({ ...bmrData, gender: value as 'M' | 'F' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleBMRCalculate}
                className="w-full"
                style={accentColor ? { backgroundColor: accentColor, color: 'white' } : undefined}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculer le BMR
              </Button>
              {bmrResult !== null && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Métabolisme de base</p>
                  <p className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                    {bmrResult.toFixed(0)} kcal/jour
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* IMC */}
        <TabsContent value="imc">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur IMC (Indice de Masse Corporelle)</CardTitle>
              <CardDescription>
                Calculez votre indice de masse corporelle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="imc-weight">Poids (kg)</Label>
                  <Input
                    id="imc-weight"
                    type="number"
                    value={imcData.weight}
                    onChange={(e) => setImcData({ ...imcData, weight: e.target.value })}
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label htmlFor="imc-height">Taille (cm)</Label>
                  <Input
                    id="imc-height"
                    type="number"
                    value={imcData.height}
                    onChange={(e) => setImcData({ ...imcData, height: e.target.value })}
                    placeholder="175"
                  />
                </div>
              </div>
              <Button
                onClick={handleIMCCalculate}
                className="w-full"
                style={accentColor ? { backgroundColor: accentColor, color: 'white' } : undefined}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculer l'IMC
              </Button>
              {imcResult !== null && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Indice de Masse Corporelle</p>
                  <p className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                    {imcResult.toFixed(1)}
                  </p>
                  <p className={`text-sm font-medium mt-2 ${getIMCCategory(imcResult).color}`}>
                    {getIMCCategory(imcResult).label}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* IMG */}
        <TabsContent value="img">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur IMG (Indice de Masse Grasse)</CardTitle>
              <CardDescription>
                Calculez votre indice de masse grasse avec la formule de Deurenberg
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="img-weight">Poids (kg)</Label>
                  <Input
                    id="img-weight"
                    type="number"
                    value={imgData.weight}
                    onChange={(e) => setImgData({ ...imgData, weight: e.target.value })}
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label htmlFor="img-height">Taille (cm)</Label>
                  <Input
                    id="img-height"
                    type="number"
                    value={imgData.height}
                    onChange={(e) => setImgData({ ...imgData, height: e.target.value })}
                    placeholder="175"
                  />
                </div>
                <div>
                  <Label htmlFor="img-age">Âge (années)</Label>
                  <Input
                    id="img-age"
                    type="number"
                    value={imgData.age}
                    onChange={(e) => setImgData({ ...imgData, age: e.target.value })}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="img-gender">Sexe</Label>
                  <Select
                    value={imgData.gender}
                    onValueChange={(value) => setImgData({ ...imgData, gender: value as 'M' | 'F' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleIMGCalculate}
                className="w-full"
                style={accentColor ? { backgroundColor: accentColor, color: 'white' } : undefined}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculer l'IMG
              </Button>
              {imgResult !== null && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Indice de Masse Grasse</p>
                  <p className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                    {imgResult.toFixed(1)}%
                  </p>
                  <p className={`text-sm font-medium mt-2 ${getIMGCategory(imgResult, imgData.gender).color}`}>
                    {getIMGCategory(imgResult, imgData.gender).label}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* RTH */}
        <TabsContent value="rth">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur RTH (Ratio Taille/Hanche)</CardTitle>
              <CardDescription>
                Calculez votre ratio taille/hanche pour évaluer le risque cardiovasculaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="rth-waist">Tour de taille (cm)</Label>
                  <Input
                    id="rth-waist"
                    type="number"
                    value={rthData.waist}
                    onChange={(e) => setRthData({ ...rthData, waist: e.target.value })}
                    placeholder="80"
                  />
                </div>
                <div>
                  <Label htmlFor="rth-hip">Tour de hanches (cm)</Label>
                  <Input
                    id="rth-hip"
                    type="number"
                    value={rthData.hip}
                    onChange={(e) => setRthData({ ...rthData, hip: e.target.value })}
                    placeholder="95"
                  />
                </div>
                <div>
                  <Label htmlFor="rth-gender">Sexe</Label>
                  <Select
                    value={rthData.gender}
                    onValueChange={(value) => setRthData({ ...rthData, gender: value as 'M' | 'F' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleRTHCalculate}
                className="w-full"
                style={accentColor ? { backgroundColor: accentColor, color: 'white' } : undefined}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculer le RTH
              </Button>
              {rthResult !== null && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Ratio Taille/Hanche</p>
                  <p className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                    {rthResult.toFixed(2)}
                  </p>
                  <p className={`text-sm font-medium mt-2 ${getRTHCategory(rthResult, rthData.gender).color}`}>
                    {getRTHCategory(rthResult, rthData.gender).label}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Poids Idéal */}
        <TabsContent value="ideal">
          <Card>
            <CardHeader>
              <CardTitle>Poids Idéal (Formule de Lorentz)</CardTitle>
              <CardDescription>
                Calculez le poids idéal selon la formule de Lorentz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="ideal-height">Taille (cm)</Label>
                  <Input
                    id="ideal-height"
                    type="number"
                    value={idealWeightData.height}
                    onChange={(e) => setIdealWeightData({ ...idealWeightData, height: e.target.value })}
                    placeholder="175"
                  />
                </div>
                <div>
                  <Label htmlFor="ideal-gender">Sexe</Label>
                  <Select
                    value={idealWeightData.gender}
                    onValueChange={(value) => setIdealWeightData({ ...idealWeightData, gender: value as 'M' | 'F' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleIdealWeightCalculate}
                className="w-full"
                style={accentColor ? { backgroundColor: accentColor, color: 'white' } : undefined}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculer le Poids Idéal
              </Button>
              {idealWeightResult !== null && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Poids Idéal</p>
                  <p className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                    {idealWeightResult.toFixed(1)} kg
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

