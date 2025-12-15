import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { canCreateOrganization } from '@/lib/subscription-limits';


/**
 * GET /api/organizations
 * 
 * Liste les organisations accessibles à l'utilisateur connecté.
 * 
 * RBAC:
 * - ADMIN: voit toutes les organisations
 * - PRO/USER: voit seulement les organisations dont ils sont propriétaires ou membres
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les ADMINS voient toutes les organisations
    const where: any =
      user.role === 'ADMIN'
        ? {}
        : {
          OR: [
            { ownerId: user.id },
            { members: { some: { userId: user.id } } },
          ],
        };

    const organizations = await prisma.organization.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/organizations
 * 
 * Crée une nouvelle organisation.
 * 
 * RBAC: Tous les utilisateurs authentifiés peuvent créer une organisation.
 * 
 * Body:
 * - name: string (requis) - Nom de l'organisation
 * - logo?: string (optionnel) - Logo en base64 (200x200px recommandé)
 * - accentColor?: string (optionnel) - Couleur d'accentuation en hex (#RRGGBB)
 * 
 * Le créateur devient automatiquement propriétaire et membre de l'organisation.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Vérifier si l'utilisateur est un PRO en attente
    if (user.role === 'PRO' && user.proStatus === 'PENDING') {
      return NextResponse.json(
        {
          error: 'Votre compte professionnel est en attente de validation. Vous ne pouvez pas créer d\'organisation pour le moment.',
          code: 'PRO_PENDING'
        },
        { status: 403 }
      );
    }

    // Récupérer l'abonnement de l'utilisateur
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    // Vérifier si l'utilisateur peut créer une organisation
    if (!canCreateOrganization(
      subscription?.status || null,
      subscription?.plan || null
    )) {
      return NextResponse.json(
        {
          error: 'La création d\'organisations nécessite un abonnement annuel actif.',
          code: 'SUBSCRIPTION_REQUIRED'
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, logo, accentColor } = body;

    // Validation: le nom est requis
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validation: longueur maximale du nom
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Name must be 100 characters or less' },
        { status: 400 }
      );
    }

    // Validation: format de couleur si fournie
    if (accentColor && !/^#[0-9A-Fa-f]{6}$/.test(accentColor)) {
      return NextResponse.json(
        { error: 'accentColor must be a valid hex color (e.g., #3b82f6)' },
        { status: 400 }
      );
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        logo,
        accentColor,
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

