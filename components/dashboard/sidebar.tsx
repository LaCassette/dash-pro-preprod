'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  MessageSquare,
  Users,
  Building2,
  UserCog,
  Bot,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  User,
  Calculator,
  UserCheck,
  CreditCard,
  FileText,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { useOrganization } from '@/hooks/use-organization';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SidebarProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    picture: string | null;
    role: 'USER' | 'PRO' | 'ADMIN';
  };
}

export function SidebarComponent({ user }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { activeOrganization, setOrganization, organizations, getAccentColor } = useOrganization();
  const { user: currentUser } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);
  const t = useTranslations('nav');
  const tRoles = useTranslations('roles');
  const tCommon = useTranslations('common');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUnreadCount();
      // Rafraîchir toutes les 10 secondes
      const interval = setInterval(fetchUnreadCount, 10000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  async function fetchUnreadCount() {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) return;
      const chats = await response.json();
      const total = chats.reduce((sum: number, chat: any) => sum + (chat.unreadCount || 0), 0);
      setUnreadCount(total);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  }

  // Ne calculer accentColor qu'après le montage pour éviter les erreurs d'hydratation
  const accentColor = mounted ? getAccentColor(theme === 'dark') : null;

  // Catégorisation des menus avec traductions
  const menuCategories = [
    {
      label: tCommon('settings'),
      labelKey: 'general',
      items: [
        {
          title: t('dashboard'),
          icon: LayoutDashboard,
          href: '/dashboard',
          roles: ['USER', 'PRO', 'ADMIN'],
        },
        {
          title: t('profile'),
          icon: User,
          href: '/dashboard/profile',
          roles: ['USER', 'PRO', 'ADMIN'],
        },
        {
          title: t('trainings'),
          icon: Dumbbell,
          href: '/dashboard/trainings',
          roles: ['USER', 'PRO', 'ADMIN'],
        },
        {
          title: t('nutrition'),
          icon: Apple,
          href: '/dashboard/nutrition',
          roles: ['USER', 'PRO', 'ADMIN'],
        },
        {
          title: t('messaging'),
          icon: MessageSquare,
          href: '/dashboard/messaging',
          roles: ['USER', 'PRO', 'ADMIN'],
          badge: unreadCount > 0 ? unreadCount : undefined,
        },
      ],
    },
    {
      label: tRoles('pro'),
      labelKey: 'professional',
      items: [
        {
          title: t('clients'),
          icon: Users,
          href: '/dashboard/clients',
          roles: ['PRO'],
        },
        {
          title: t('organizations'),
          icon: Building2,
          href: '/dashboard/organizations',
          roles: ['PRO'],
        },
        {
          title: t('assistants'),
          icon: Bot,
          href: '/dashboard/assistants',
          roles: ['PRO'],
        },
        {
          title: t('calculators'),
          icon: Calculator,
          href: '/dashboard/calculators',
          roles: ['PRO'],
        },
        {
          title: t('programs'),
          icon: FileText,
          href: '/dashboard/programs',
          roles: ['PRO'],
        },
        {
          title: t('programBuilder'),
          icon: Dumbbell,
          href: '/dashboard/programs/builder',
          roles: ['PRO'],
        },
        {
          title: t('subscription'),
          icon: CreditCard,
          href: '/dashboard/subscription',
          roles: ['PRO'],
        },
      ],
    },
    {
      label: tRoles('user'),
      labelKey: 'user',
      items: [
        {
          title: t('organizations'),
          icon: Building2,
          href: '/dashboard/organizations/user',
          roles: ['USER'],
        },
      ],
    },
    {
      label: t('admin'),
      labelKey: 'admin',
      items: [
        {
          title: t('pros'),
          icon: UserCheck,
          href: '/dashboard/admin/pros',
          roles: ['ADMIN'],
        },
        {
          title: t('users'),
          icon: UserCog,
          href: '/dashboard/admin/users',
          roles: ['ADMIN'],
        },
        {
          title: t('organizations'),
          icon: Building2,
          href: '/dashboard/admin/organizations',
          roles: ['ADMIN'],
        },
      ],
    },
  ];

  // Filtrer les catégories qui ont des items visibles pour le rôle de l'utilisateur
  const visibleCategories = menuCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.roles.includes(user.role)),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <Sidebar collapsible="icon" data-tour="sidebar">
      <SidebarHeader>
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.picture || undefined} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <div className="font-medium">{user.name || user.email}</div>
              <Badge variant="outline" className="w-fit text-xs">
                {user.role}
              </Badge>
            </div>
          </div>
          {organizations.length > 0 && (
            <div className="group-data-[collapsible=icon]:hidden" data-tour="organization-selector">
              <Select
                value={activeOrganization?.id || ''}
                onValueChange={(value) => {
                  const org = organizations.find((o) => o.id === value);
                  if (org) setOrganization(org);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une organisation" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {visibleCategories.map((category) => (
          <SidebarGroup key={category.label}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              {category.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        style={mounted && isActive && accentColor ? {
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                        } : undefined}
                      >
                        <Link
                          href={item.href}
                          data-tour={
                            item.href === '/dashboard/profile' ? 'profile-link' :
                              item.href === '/dashboard/trainings' ? 'trainings-link' :
                                item.href === '/dashboard/nutrition' ? 'nutrition-link' :
                                  item.href === '/dashboard/messaging' ? 'messaging-link' :
                                    item.href === '/dashboard/clients' ? 'clients-link' :
                                      item.href === '/dashboard/organizations' ? 'organizations-link' :
                                        item.href === '/dashboard/assistants' ? 'assistants-link' :
                                          item.href === '/dashboard/calculators' ? 'calculators-link' :
                                            item.href === '/dashboard/subscription' ? 'subscription-link' :
                                              item.href === '/dashboard/organizations/user' ? 'user-organizations-link' :
                                                undefined
                          }
                        >
                          <Icon style={mounted && isActive && accentColor ? { color: accentColor } : undefined} />
                          <span>{item.title}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <Badge
                              variant="destructive"
                              className="ml-auto h-5 min-w-5 px-1.5 flex items-center justify-center text-xs"
                            >
                              {item.badge > 99 ? '99+' : item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:px-2"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">☀️</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">🌙</span>
              </>
            )}
          </Button>
          <SidebarMenuButton asChild className="w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:px-2" tooltip={tCommon('logout')}>
            <Link href="/auth/logout">
              <LogOut />
              <span className="group-data-[collapsible=icon]:hidden">{tCommon('logout')}</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
