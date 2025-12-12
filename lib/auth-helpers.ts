import { auth0 } from './auth0';
import { prisma } from './prisma';

/**
 * Récupère l'utilisateur authentifié depuis la session Auth0 et la base de données.
 * 
 * Cette fonction:
 * 1. Récupère la session Auth0 (qui utilise automatiquement le contexte de la requête dans App Router)
 * 2. Extrait l'auth0Id (sub) de l'utilisateur Auth0
 * 3. Recherche l'utilisateur correspondant dans la base de données Prisma
 * 
 * @returns L'utilisateur de la base de données ou null si non authentifié/inexistant
 * 
 * @throws Ne lance pas d'erreur, retourne null en cas d'erreur pour permettre
 *         aux routes de gérer elles-mêmes l'authentification
 */
export async function getAuthenticatedUser() {
  try {
    // Dans App Router route handlers, getSession() utilise automatiquement le contexte de la requête
    const session = await auth0.getSession();
    
    if (!session || !session.user) {
      return null;
    }

    const auth0User = session.user;
    const auth0Id = auth0User.sub;

    if (!auth0Id) {
      console.warn('Auth0 session exists but no sub (auth0Id) found');
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    return user;
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
}
