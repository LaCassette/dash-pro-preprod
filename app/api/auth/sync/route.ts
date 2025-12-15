import { auth0 } from '@/lib/auth0';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


/**
 * API route pour synchroniser l'utilisateur Auth0 avec notre base de données
 * Appelée automatiquement après l'authentification Auth0
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth0.getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'No session' }, { status: 401 });
        }

        const auth0User = session.user;
        const auth0Id = auth0User.sub as string;
        const email = auth0User.email as string;
        const name = auth0User.name as string;
        const picture = auth0User.picture as string;

        // Vérifier si l'utilisateur existe déjà
        let user = await prisma.user.findUnique({
            where: { auth0Id },
        });

        if (!user) {
            // Lire les cookies pour le rôle et le code de parrainage
            const signupRole = request.cookies.get('signup_role')?.value as 'USER' | 'PRO' | null;
            const referralCode = request.cookies.get('signup_referral_code')?.value || null;

            // Créer le nouvel utilisateur
            user = await prisma.user.create({
                data: {
                    auth0Id,
                    email,
                    name: name || email.split('@')[0],
                    picture: picture || null,
                    role: signupRole === 'PRO' ? 'PRO' : 'USER',
                    proStatus: signupRole === 'PRO' ? 'PENDING' : null,
                },
            });

            console.log(`New user created: ${user.id} (${user.email}) with role ${user.role}`);

            // Traiter le code de parrainage si présent
            if (referralCode && process.env.API_BASE_URL) {
                try {
                    await fetch(`${process.env.API_BASE_URL}/api/v2/referrals/process`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: user.id,
                            referralCode: referralCode.toUpperCase(),
                            action: 'signup',
                        }),
                    });
                    console.log(`Referral processed for user ${user.id}`);
                } catch (error) {
                    console.error('Error processing referral:', error);
                }
            }
        } else {
            // Mettre à jour l'utilisateur existant
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    name: name || user.name,
                    email: email || user.email,
                    picture: picture || user.picture,
                },
            });
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Error syncing user:', error);
        return NextResponse.json(
            { error: 'Failed to sync user' },
            { status: 500 }
        );
    }
}
