import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

/**
 * GET /api/organizations/[id]
 * 
 * Récupère les détails d'une organisation spécifique.
 * 
 * RBAC:
 * - ADMIN: peut voir toutes les organisations
 * - PRO/USER: peut voir seulement les organisations dont ils sont propriétaires ou membres
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les admins peuvent voir toutes les organisations
    const where: any =
      user.role === 'ADMIN'
        ? { id }
        : {
          id,
          OR: [
            { ownerId: user.id },
            { members: { some: { userId: user.id } } },
          ],
        };

    const organization = await prisma.organization.findFirst({
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

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error fetching organization:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/organizations/[id]
 * 
 * Met à jour une organisation.
 * 
 * RBAC:
 * - ADMIN: peut modifier toutes les organisations
 * - PRO: peut modifier seulement les organisations dont ils sont propriétaires
 * 
 * Body (tous optionnels):
 * - name?: string - Nouveau nom
 * - logo?: string | null - Nouveau logo en base64 (200x200px recommandé)
 * - accentColor?: string | null - Nouvelle couleur d'accentuation en hex
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les admins peuvent modifier toutes les organisations, sinon seulement le owner
    const where: any =
      user.role === 'ADMIN'
        ? { id }
        : {
          id,
          ownerId: user.id,
        };

    const organization = await prisma.organization.findFirst({
      where,
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found or you are not the owner' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, logo, accentColor } = body;

    // Validation: si name est fourni, il doit être valide
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Name must be a non-empty string' },
          { status: 400 }
        );
      }
      if (name.trim().length > 100) {
        return NextResponse.json(
          { error: 'Name must be 100 characters or less' },
          { status: 400 }
        );
      }
    }

    // Validation: format de couleur si fournie
    if (accentColor !== undefined && accentColor !== null) {
      if (!/^#[0-9A-Fa-f]{6}$/.test(accentColor)) {
        return NextResponse.json(
          { error: 'accentColor must be a valid hex color (e.g., #3b82f6)' },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.organization.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(logo !== undefined && { logo }),
        ...(accentColor !== undefined && { accentColor }),
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating organization:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/organizations/[id]
 * 
 * Supprime une organisation.
 * 
 * RBAC:
 * - ADMIN: peut supprimer toutes les organisations
 * - PRO: peut supprimer seulement les organisations dont ils sont propriétaires
 * 
 * ⚠️ ATTENTION: Cette action est irréversible et supprime également:
 * - Tous les membres de l'organisation
 * - Tous les programmes associés
 * - Tous les chats associés
 * - Toutes les invitations et demandes
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Les admins peuvent supprimer toutes les organisations, sinon seulement le owner
    const where: any =
      user.role === 'ADMIN'
        ? { id }
        : {
          id,
          ownerId: user.id,
        };

    const organization = await prisma.organization.findFirst({
      where,
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found or you are not the owner' },
        { status: 404 }
      );
    }

    await prisma.organization.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting organization:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

