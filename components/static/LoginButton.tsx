'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

const LoginButton = () => {
  const { user } = useUser();
  
  if (user) {
    return null; // Ne pas afficher si déjà connecté
  }
  
  return (
    <a 
      href="/api/auth/login" 
      className="button login"
    >
      Log In
    </a>
  );
};

export default LoginButton;

