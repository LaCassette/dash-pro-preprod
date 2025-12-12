import { Auth0Client } from '@auth0/nextjs-auth0/server';

// Configuration Auth0 pour Next.js v4
// Les variables d'environnement suivantes sont requises:
// - AUTH0_SECRET: Secret pour signer les cookies (généré avec: openssl rand -hex 32)
// - AUTH0_DOMAIN: Votre domaine Auth0 (ex: cassette.eu.auth0.com)
// - AUTH0_CLIENT_ID: Votre Client ID Auth0
// - AUTH0_CLIENT_SECRET: Votre Client Secret Auth0
// - APP_BASE_URL: URL de base de votre application (ex: http://localhost:3000)

export const auth0 = new Auth0Client();
