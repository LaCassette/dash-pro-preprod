'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Dumbbell,
  Apple,
  MessageSquare,
  Users,
  Building2,
  Bot,
  TrendingUp,
  Activity,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  programs: {
    sport: number;
    nutrition: number;
    total: number;
    recent: number;
  };
  chats: {
    total: number;
    messages: {
      total: number;
      recent: number;
    };
  };
  clients: number;
  organizations: number;
  assistants: number;
}

export default function DashboardPage() {
  const { user } = useUser();
  const { activeOrganization, getAccentColor } = useOrganization();
  const { theme } = useTheme();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('dashboard');
  const tRoles = useTranslations('roles');

  const accentColor = getAccentColor(theme === 'dark');

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchStats();
    }
  }, [user, activeOrganization]);

  async function fetchStats() {
    try {
      const url = activeOrganization
        ? `/api/dashboard/stats?organizationId=${activeOrganization.id}`
        : '/api/dashboard/stats';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
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
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
      </div>
      <div className="mb-6" data-tour="dashboard-header">
        <h1
          className="text-3xl font-bold"
          style={accentColor ? { color: accentColor } : undefined}
        >
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('welcomeMessage', { name: user.name || user.email })}
          {activeOrganization && (
            <span className="ml-2">
              • {activeOrganization.name}
            </span>
          )}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-tour="dashboard-stats">
        {/* Rôle - Large card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('role')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className="text-lg px-3 py-1"
              style={accentColor ? {
                borderColor: accentColor,
                color: accentColor
              } : undefined}
            >
              {tRoles(user.role.toLowerCase())}
            </Badge>
          </CardContent>
        </Card>

        {/* Programmes Sportifs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('sportPrograms')}
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
              {stats?.programs.sport || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.programs.recent || 0} {t('createdThisWeek')}
            </p>
          </CardContent>
        </Card>

        {/* Programmes Nutritionnels */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('nutritionPrograms')}
            </CardTitle>
            <Apple className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
              {stats?.programs.nutrition || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.programs.recent || 0} {t('createdThisWeek')}
            </p>
          </CardContent>
        </Card>

        {/* Total Programmes */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('totalPrograms')}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
              {stats?.programs.total || 0}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {stats?.programs.recent || 0} {t('newThisWeek')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Messagerie */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('conversations')}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
              {stats?.chats.total || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.chats.messages.total || 0} {t('totalMessages')}
            </p>
          </CardContent>
        </Card>

        {/* Messages Récents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('recentMessages')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
              {stats?.chats.messages.recent || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('thisWeek')}
            </p>
          </CardContent>
        </Card>

        {/* Clients (PRO seulement) */}
        {user.role === 'PRO' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                {stats?.clients || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Clients actifs
              </p>
            </CardContent>
          </Card>
        )}

        {/* Organisations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Organisations
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
              {stats?.organizations || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {user.role === 'PRO' ? 'Organisations gérées' : 'Organisations membres'}
            </p>
          </CardContent>
        </Card>

        {/* Assistants (PRO seulement) */}
        {user.role === 'PRO' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assistants
              </CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={accentColor ? { color: accentColor } : undefined}>
                {stats?.assistants || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Assistants configurés
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

