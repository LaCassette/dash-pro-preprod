'use client';

import { useUser as useAuth0User } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  auth0Id: string;
  email: string;
  name: string | null;
  picture: string | null;
  role: 'USER' | 'PRO' | 'ADMIN';
  proStatus?: 'PENDING' | 'ACTIVE' | 'REJECTED' | null;
  organizationMemberships?: Array<{
    organization: {
      id: string;
      name: string;
      logo: string | null;
      accentColor: string | null;
    };
  }>;
}

export function useUser() {
  const { user: auth0User, error: auth0Error, isLoading: auth0Loading } = useAuth0User();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (auth0Loading) {
      return;
    }

    if (!auth0User) {
      setUser(null);
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/user');

        if (!response.ok) {
          if (response.status === 401) {
            setUser(null);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [auth0User, auth0Loading]);

  return {
    user,
    loading: loading || auth0Loading,
    error: error || (auth0Error ? new Error(auth0Error.message) : null)
  };
}
