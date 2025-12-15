import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


/**
 * GET /api/public/stats
 * 
 * Récupère les statistiques publiques pour la landing page.
 */
export async function GET() {
  try {
    // Compter les utilisateurs
    const totalUsers = await prisma.user.count();
    const proUsers = await prisma.user.count({
      where: { role: 'PRO' },
    });
    const regularUsers = await prisma.user.count({
      where: { role: 'USER' },
    });

    // Compter les programmes
    const totalPrograms = await prisma.program.count();
    const sportPrograms = await prisma.program.count({
      where: { type: 'SPORT' },
    });
    const nutritionPrograms = await prisma.program.count({
      where: { type: 'NUTRITION' },
    });

    // Compter les organisations
    const totalOrganizations = await prisma.organization.count();

    // Compter les messages (pour montrer l'engagement)
    const totalMessages = await prisma.message.count();

    // Compter les assistants IA
    const totalAssistants = await prisma.agent.count();

    return NextResponse.json({
      users: {
        total: totalUsers,
        pros: proUsers,
        regular: regularUsers,
      },
      programs: {
        total: totalPrograms,
        sport: sportPrograms,
        nutrition: nutritionPrograms,
      },
      organizations: totalOrganizations,
      messages: totalMessages,
      assistants: totalAssistants,
    });
  } catch (error) {
    console.error('Error fetching public stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

