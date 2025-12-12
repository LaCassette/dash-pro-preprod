'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

const LogoutButton = () => {
  const { user } = useUser();
  
  if (!user) {
    return null; // Ne pas afficher si non connecté
  }
  
  return (
    <a 
      href="/api/auth/logout" 
      className="button logout"
    >
      Log Out
    </a>
  );
};

export default LogoutButton;

