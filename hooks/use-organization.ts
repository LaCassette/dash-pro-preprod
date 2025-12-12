'use client';

import { useState, useEffect } from 'react';
import { useUser } from './use-user';

interface Organization {
  id: string;
  name: string;
  logo: string | null;
  accentColor: string | null;
}

export function useOrganization() {
  const { user } = useUser();
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Récupérer l'organisation active depuis localStorage
    const storedOrgId = localStorage.getItem('activeOrganizationId');
    
    if (storedOrgId && user.organizationMemberships) {
      const org = user.organizationMemberships.find(
        (m) => m.organization.id === storedOrgId
      );
      if (org) {
        setActiveOrganization(org.organization);
        setLoading(false);
        return;
      }
    }

    // Si aucune organisation n'est stockée, prendre la première disponible
    if (user.organizationMemberships && user.organizationMemberships.length > 0) {
      const firstOrg = user.organizationMemberships[0].organization;
      setActiveOrganization(firstOrg);
      localStorage.setItem('activeOrganizationId', firstOrg.id);
    }
    
    setLoading(false);
  }, [user]);

  const setOrganization = (organization: Organization | null) => {
    if (organization) {
      setActiveOrganization(organization);
      localStorage.setItem('activeOrganizationId', organization.id);
    } else {
      setActiveOrganization(null);
      localStorage.removeItem('activeOrganizationId');
    }
  };

  // Obtenir la couleur d'accentuation (ou couleur par défaut)
  const getAccentColor = (isDark: boolean = false): string => {
    if (activeOrganization?.accentColor) {
      return activeOrganization.accentColor;
    }
    // Couleur par défaut : slate-950 sur blanc OU slate-50 sur noir
    return isDark ? '#f8fafc' : '#020617'; // slate-50 : #f8fafc, slate-950 : #020617
  };

  return {
    activeOrganization,
    setOrganization,
    getAccentColor,
    loading,
    organizations: user?.organizationMemberships?.map((m) => m.organization) || [],
  };
}

