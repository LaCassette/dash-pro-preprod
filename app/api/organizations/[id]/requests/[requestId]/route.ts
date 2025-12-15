import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

export const runtime = 'edge';

/**
 * POST /api/organizations/[id]/requests/[requestId]
 * 
 * Permet à un PRO propriétaire d'approuver ou rejeter une demande d'adhésion.
 * 
 * RBAC: PRO seulement, et doit être le propriétaire de l'organisation.
 * 
 * Body:
 * - action: 'approve' | 'reject'
 * 
 * Actions:
 * - Si 'approve': crée le membre et marque la demande comme APPROVED
 * - Si 'reject': marque la demande comme REJECTED
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; requestId: string }> }
) {
  try {
    const { id, requestId } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const organization = await prisma.organization.findFirst({
      where: {
        id,
        ownerId: user.id,
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found or you are not the owner' },
        { status: 404 }
      );
    }

    const orgRequest = await prisma.organizationRequest.findUnique({
      where: { id: requestId },
    });

    if (!orgRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    if (orgRequest.organizationId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (orgRequest.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Request is not pending' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { action } = body; // 'approve' ou 'reject'

    if (action === 'approve') {
      // Vérifier si l'utilisateur est déjà membre
      const existingMember = await prisma.organizationMember.findUnique({
        where: {
          userId_organizationId: {
            userId: orgRequest.userId,
            organizationId: id,
          },
        },
      });

      if (existingMember) {
        // L'utilisateur est déjà membre, on marque juste la demande comme approuvée
        await prisma.organizationRequest.update({
          where: { id: requestId },
          data: { status: 'APPROVED' },
        });
      } else {
        // Créer le membre et marquer la demande comme approuvée en transaction
        await prisma.$transaction([
          prisma.organizationMember.create({
            data: {
              userId: orgRequest.userId,
              organizationId: id,
            },
          }),
          prisma.organizationRequest.update({
            where: { id: requestId },
            data: { status: 'APPROVED' },
          }),
        ]);
      }
    } else if (action === 'reject') {
      await prisma.organizationRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "approve" or "reject"' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

