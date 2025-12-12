'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {
    ChevronLeft,
    Plus,
    TrendingUp,
    TrendingDown,
    Minus,
    Scale,
    Ruler,
    Activity,
    Loader2,
    Trash2,
} from 'lucide-react';

interface Measurement {
    id: string;
    weight: number | null;
    height: number | null;
    waistCircum: number | null;
    chestCircum: number | null;
    armCircum: number | null;
    thighCircum: number | null;
    hipCircum: number | null;
    bodyFatPercent: number | null;
    muscleMass: number | null;
    bmi: number | null;
    notes: string | null;
    measuredAt: string;
}

interface MeasurementStats {
    hasData: boolean;
    count: number;
    latest: {
        date: string;
        weight: number | null;
        waistCircum: number | null;
        bodyFatPercent: number | null;
        muscleMass: number | null;
        bmi: number | null;
    };
    changes: {
        total: {
            weight: number | null;
            waistCircum: number | null;
            bodyFatPercent: number | null;
            muscleMass: number | null;
        };
        lastMonth: {
            weight: number | null;
            waistCircum: number | null;
        };
    };
    chartData: Array<{
        date: string;
        weight: number | null;
        waistCircum: number | null;
        bodyFatPercent: number | null;
        muscleMass: number | null;
        bmi: number | null;
    }>;
}

const chartConfig = {
    weight: { label: 'Poids (kg)', color: 'hsl(var(--chart-1))' },
    waistCircum: { label: 'Tour de taille (cm)', color: 'hsl(var(--chart-2))' },
    bodyFatPercent: { label: 'Masse grasse (%)', color: 'hsl(var(--chart-3))' },
    muscleMass: { label: 'Masse musculaire (kg)', color: 'hsl(var(--chart-4))' },
};

function TrendIndicator({ value }: { value: number | null }) {
    if (value === null) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
}

export default function ClientMeasurementsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();
    const clientId = params.id as string;

    const [stats, setStats] = useState<MeasurementStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        waistCircum: '',
        chestCircum: '',
        armCircum: '',
        thighCircum: '',
        hipCircum: '',
        bodyFatPercent: '',
        muscleMass: '',
        notes: '',
    });

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch(`/api/measurements/users/${clientId}/stats`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
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
        fetchStats();
    }, [fetchStats]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/measurements/users/${clientId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    weight: formData.weight ? parseFloat(formData.weight) : null,
                    height: formData.height ? parseFloat(formData.height) : null,
                    waistCircum: formData.waistCircum ? parseFloat(formData.waistCircum) : null,
                    chestCircum: formData.chestCircum ? parseFloat(formData.chestCircum) : null,
                    armCircum: formData.armCircum ? parseFloat(formData.armCircum) : null,
                    thighCircum: formData.thighCircum ? parseFloat(formData.thighCircum) : null,
                    hipCircum: formData.hipCircum ? parseFloat(formData.hipCircum) : null,
                    bodyFatPercent: formData.bodyFatPercent ? parseFloat(formData.bodyFatPercent) : null,
                    muscleMass: formData.muscleMass ? parseFloat(formData.muscleMass) : null,
                    notes: formData.notes || null,
                }),
            });

            if (!res.ok) throw new Error('Failed to save');

            toast({ title: 'Mensuration ajoutée', description: 'Les données ont été enregistrées' });
            setAddDialogOpen(false);
            setFormData({
                weight: '', height: '', waistCircum: '', chestCircum: '',
                armCircum: '', thighCircum: '', hipCircum: '', bodyFatPercent: '',
                muscleMass: '', notes: '',
            });
            fetchStats();
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'enregistrer les données',
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    if (user?.role !== 'PRO') {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Accès refusé</CardTitle>
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
                        <h1 className="text-2xl font-bold">Mensurations</h1>
                        <p className="text-muted-foreground">Suivi de l'évolution corporelle</p>
                    </div>
                </div>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle mesure
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Ajouter une mensuration</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Poids (kg)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        step="0.1"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        placeholder="75.5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height">Taille (cm)</Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                        placeholder="175"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="waistCircum">Tour de taille (cm)</Label>
                                    <Input
                                        id="waistCircum"
                                        type="number"
                                        step="0.1"
                                        value={formData.waistCircum}
                                        onChange={(e) => setFormData({ ...formData, waistCircum: e.target.value })}
                                        placeholder="80"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="chestCircum">Tour de poitrine (cm)</Label>
                                    <Input
                                        id="chestCircum"
                                        type="number"
                                        step="0.1"
                                        value={formData.chestCircum}
                                        onChange={(e) => setFormData({ ...formData, chestCircum: e.target.value })}
                                        placeholder="100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="armCircum">Tour de bras (cm)</Label>
                                    <Input
                                        id="armCircum"
                                        type="number"
                                        step="0.1"
                                        value={formData.armCircum}
                                        onChange={(e) => setFormData({ ...formData, armCircum: e.target.value })}
                                        placeholder="35"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="thighCircum">Tour de cuisse (cm)</Label>
                                    <Input
                                        id="thighCircum"
                                        type="number"
                                        step="0.1"
                                        value={formData.thighCircum}
                                        onChange={(e) => setFormData({ ...formData, thighCircum: e.target.value })}
                                        placeholder="55"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hipCircum">Tour de hanches (cm)</Label>
                                    <Input
                                        id="hipCircum"
                                        type="number"
                                        step="0.1"
                                        value={formData.hipCircum}
                                        onChange={(e) => setFormData({ ...formData, hipCircum: e.target.value })}
                                        placeholder="95"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bodyFatPercent">Masse grasse (%)</Label>
                                    <Input
                                        id="bodyFatPercent"
                                        type="number"
                                        step="0.1"
                                        value={formData.bodyFatPercent}
                                        onChange={(e) => setFormData({ ...formData, bodyFatPercent: e.target.value })}
                                        placeholder="15"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="muscleMass">Masse musculaire (kg)</Label>
                                    <Input
                                        id="muscleMass"
                                        type="number"
                                        step="0.1"
                                        value={formData.muscleMass}
                                        onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
                                        placeholder="35"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Observations, contexte..."
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={saving}>
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Enregistrer
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : !stats?.hasData ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Scale className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">Aucune mensuration</h3>
                        <p className="text-muted-foreground mb-4">
                            Commencez le suivi en ajoutant une première mesure
                        </p>
                        <Button onClick={() => setAddDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une mesure
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Poids actuel</CardTitle>
                                <Scale className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.latest.weight?.toFixed(1) || '-'} kg
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <TrendIndicator value={stats.changes.total.weight} />
                                    {stats.changes.total.weight !== null && (
                                        <span className={stats.changes.total.weight > 0 ? 'text-green-500' : 'text-red-500'}>
                                            {stats.changes.total.weight > 0 ? '+' : ''}{stats.changes.total.weight} kg total
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Tour de taille</CardTitle>
                                <Ruler className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.latest.waistCircum?.toFixed(1) || '-'} cm
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <TrendIndicator value={stats.changes.total.waistCircum ? -stats.changes.total.waistCircum : null} />
                                    {stats.changes.total.waistCircum !== null && (
                                        <span className={stats.changes.total.waistCircum < 0 ? 'text-green-500' : 'text-red-500'}>
                                            {stats.changes.total.waistCircum > 0 ? '+' : ''}{stats.changes.total.waistCircum} cm total
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">IMC</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.latest.bmi?.toFixed(1) || '-'}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.latest.bmi && (
                                        stats.latest.bmi < 18.5 ? 'Insuffisance pondérale' :
                                            stats.latest.bmi < 25 ? 'Poids normal' :
                                                stats.latest.bmi < 30 ? 'Surpoids' : 'Obésité'
                                    )}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Masse grasse</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.latest.bodyFatPercent?.toFixed(1) || '-'}%
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <TrendIndicator value={stats.changes.total.bodyFatPercent ? -stats.changes.total.bodyFatPercent : null} />
                                    {stats.changes.total.bodyFatPercent !== null && (
                                        <span className={stats.changes.total.bodyFatPercent < 0 ? 'text-green-500' : 'text-red-500'}>
                                            {stats.changes.total.bodyFatPercent > 0 ? '+' : ''}{stats.changes.total.bodyFatPercent}% total
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Évolution du poids</CardTitle>
                                <CardDescription>Historique des mesures de poids</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={stats.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" fontSize={12} tickFormatter={(v) => v.slice(5)} />
                                            <YAxis fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line
                                                type="monotone"
                                                dataKey="weight"
                                                stroke="var(--color-weight)"
                                                strokeWidth={2}
                                                dot={{ r: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tour de taille</CardTitle>
                                <CardDescription>Évolution du tour de taille</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={stats.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" fontSize={12} tickFormatter={(v) => v.slice(5)} />
                                            <YAxis fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Area
                                                type="monotone"
                                                dataKey="waistCircum"
                                                stroke="var(--color-waistCircum)"
                                                fill="var(--color-waistCircum)"
                                                fillOpacity={0.3}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Composition Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Composition corporelle</CardTitle>
                            <CardDescription>Masse grasse vs masse musculaire</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats.chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" fontSize={12} tickFormatter={(v) => v.slice(5)} />
                                        <YAxis fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="bodyFatPercent"
                                            stroke="var(--color-bodyFatPercent)"
                                            strokeWidth={2}
                                            name="Masse grasse (%)"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="muscleMass"
                                            stroke="var(--color-muscleMass)"
                                            strokeWidth={2}
                                            name="Masse musculaire (kg)"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
