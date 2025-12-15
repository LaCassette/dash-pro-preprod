import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { encryptObject, decryptObject } from '@/lib/encryption';

export const runtime = 'edge';

// GET: Récupérer le profil d'un utilisateur
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

    // L'utilisateur peut voir son propre profil, les PROs peuvent voir les profils de leurs clients
    if (user.role === 'USER' && id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Si PRO, vérifier que l'utilisateur cible est un client
    if (user.role === 'PRO') {
      const targetUser = await prisma.user.findUnique({
        where: { id },
        include: {
          organizationMemberships: {
            include: {
              organization: {
                include: {
                  members: true,
                },
              },
            },
          },
        },
      });

      if (!targetUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Vérifier que le PRO a accès à cet utilisateur via une organisation
      const hasAccess = targetUser.organizationMemberships.some((om: any) =>
        om.organization.members.some((m: any) => m.userId === user.id)
      );

      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    // Récupérer les profils
    const [sportProfile, nutritionProfile, medicalProfile, lifestyleProfile] = await Promise.all([
      prisma.userSportProfile.findUnique({
        where: { userId: id },
      }),
      prisma.userNutritionProfile.findUnique({
        where: { userId: id },
      }),
      prisma.userMedicalProfile.findUnique({
        where: { userId: id },
      }),
      prisma.userLifestyleProfile.findUnique({
        where: { userId: id },
      }),
    ]);

    // Déchiffrer les données
    const result: {
      sport?: any;
      nutrition?: any;
      medical?: any;
      lifestyle?: any;
    } = {};

    if (sportProfile) {
      try {
        result.sport = await decryptObject(sportProfile.data);
      } catch (error) {
        console.error('Error decrypting sport profile:', error);
        return NextResponse.json(
          { error: 'Failed to decrypt sport profile' },
          { status: 500 }
        );
      }
    }

    if (nutritionProfile) {
      try {
        result.nutrition = await decryptObject(nutritionProfile.data);
      } catch (error) {
        console.error('Error decrypting nutrition profile:', error);
        return NextResponse.json(
          { error: 'Failed to decrypt nutrition profile' },
          { status: 500 }
        );
      }
    }

    if (medicalProfile) {
      try {
        result.medical = await decryptObject(medicalProfile.data);
      } catch (error) {
        console.error('Error decrypting medical profile:', error);
        return NextResponse.json(
          { error: 'Failed to decrypt medical profile' },
          { status: 500 }
        );
      }
    }

    if (lifestyleProfile) {
      try {
        result.lifestyle = JSON.parse(lifestyleProfile.data); // Lifestyle may not be encrypted
      } catch (error) {
        console.error('Error parsing lifestyle profile:', error);
        // If it's encrypted, try to decrypt
        try {
          result.lifestyle = await decryptObject(lifestyleProfile.data);
        } catch {
          result.lifestyle = lifestyleProfile.data;
        }
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST/PATCH: Sauvegarder ou mettre à jour le profil
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // L'utilisateur peut modifier son propre profil, les PROs peuvent modifier les profils de leurs clients
    if (user.role === 'USER' && id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Si PRO, vérifier que l'utilisateur cible est un client
    if (user.role === 'PRO') {
      const targetUser = await prisma.user.findUnique({
        where: { id },
        include: {
          organizationMemberships: {
            include: {
              organization: {
                include: {
                  members: true,
                },
              },
            },
          },
        },
      });

      if (!targetUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Vérifier que le PRO a accès à cet utilisateur via une organisation
      const hasAccess = targetUser.organizationMemberships.some((om: any) =>
        om.organization.members.some((m: any) => m.userId === user.id)
      );

      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const body = await request.json();
    const { sport, nutrition, medical, lifestyle } = body;

    // Vérifier que les modèles Prisma sont disponibles
    if (!prisma.userSportProfile || !prisma.userNutritionProfile) {
      console.error('Prisma models not available. Please restart the development server after running: npx prisma generate');
      return NextResponse.json(
        { error: 'Internal server error: Prisma models not available. Please restart the server.' },
        { status: 500 }
      );
    }

    // Chiffrer et sauvegarder les profils
    const updates: Promise<any>[] = [];

    if (sport !== undefined) {
      const encryptedData = await encryptObject(sport);
      updates.push(
        prisma.userSportProfile.upsert({
          where: { userId: id },
          update: { data: encryptedData },
          create: {
            userId: id,
            data: encryptedData,
          },
        })
      );
    }

    if (nutrition !== undefined) {
      const encryptedData = await encryptObject(nutrition);
      updates.push(
        prisma.userNutritionProfile.upsert({
          where: { userId: id },
          update: { data: encryptedData },
          create: {
            userId: id,
            data: encryptedData,
          },
        })
      );
    }

    if (medical !== undefined) {
      const encryptedData = await encryptObject(medical);
      updates.push(
        prisma.userMedicalProfile.upsert({
          where: { userId: id },
          update: { data: encryptedData },
          create: {
            userId: id,
            data: encryptedData,
          },
        })
      );
    }

    if (lifestyle !== undefined) {
      // Lifestyle can be stored as JSON (not necessarily encrypted)
      const data = JSON.stringify(lifestyle);
      updates.push(
        prisma.userLifestyleProfile.upsert({
          where: { userId: id },
          update: { data },
          create: {
            userId: id,
            data,
          },
        })
      );
    }

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PATCH: Mettre à jour partiellement le profil
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return POST(request, { params });
}

