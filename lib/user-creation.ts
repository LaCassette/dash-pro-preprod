import { prisma } from './prisma';

// Auth0 user interface (Auth0 v4 doesn't export this type)
interface Auth0User {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: unknown;
}

/**
 * Crée ou met à jour un utilisateur dans la base de données
 * Gère le rôle PRO avec statut PENDING si demandé lors de l'inscription
 */
export async function createOrUpdateUser(auth0User: Auth0User) {
  const auth0Id = auth0User.sub;
  if (!auth0Id) {
    throw new Error('Auth0 user missing sub');
  }

  // Récupérer le rôle depuis app_metadata ou user_metadata
  // Auth0 peut stocker des métadonnées personnalisées
  const roleFromMetadata =
    (auth0User as any).app_metadata?.role ||
    (auth0User as any).user_metadata?.role;

  // Si le rôle est PRO, créer avec statut PENDING
  const role = roleFromMetadata === 'PRO' ? 'PRO' : 'USER';
  const proStatus = role === 'PRO' ? 'PENDING' : null;

  // Chercher l'utilisateur existant
  const existingUser = await prisma.user.findUnique({
    where: { auth0Id },
  });

  if (existingUser) {
    // Mettre à jour les infos mais ne pas changer le rôle si déjà défini
    // (sauf si c'est la première connexion après inscription PRO)
    return await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: auth0User.email || existingUser.email,
        name: auth0User.name || existingUser.name,
        picture: auth0User.picture || existingUser.picture,
        // Ne mettre à jour le rôle que si l'utilisateur n'en a pas encore
        ...(existingUser.role === 'USER' && role === 'PRO' && {
          role: 'PRO',
          proStatus: 'PENDING',
        }),
      },
      include: {
        organizationMemberships: {
          include: {
            organization: true,
          },
        },
        subscription: true,
      },
    });
  }

  // Créer un nouvel utilisateur
  return await prisma.user.create({
    data: {
      auth0Id,
      email: auth0User.email || '',
      name: auth0User.name || auth0User.email || null,
      picture: auth0User.picture || null,
      role,
      proStatus,
    },
    include: {
      organizationMemberships: {
        include: {
          organization: true,
        },
      },
      subscription: true,
    },
  });
}

