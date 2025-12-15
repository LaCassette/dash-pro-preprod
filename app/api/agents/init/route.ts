import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { defaultAgents } from '@/lib/default-agents';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get existing agent names for this user
    const existingAgents = await prisma.agent.findMany({
      where: { createdById: user.id },
      select: { name: true },
    });
    const existingNames = new Set(existingAgents.map(a => a.name));

    // Create agents that don't exist yet
    const agentsToCreate = defaultAgents.filter(agent => !existingNames.has(agent.name));

    if (agentsToCreate.length === 0) {
      return NextResponse.json({
        message: 'All agents already exist',
        created: 0,
      });
    }

    // Create all new agents
    const createdAgents = await Promise.all(
      agentsToCreate.map(agent =>
        prisma.agent.create({
          data: {
            name: agent.name,
            prompt: agent.prompt,
            context: agent.context,
            image: agent.avatar,
            createdById: user.id,
          },
        })
      )
    );

    return NextResponse.json({
      message: `${createdAgents.length} agents créés avec succès`,
      created: createdAgents.length,
      agents: createdAgents,
    });
  } catch (error) {
    console.error('Error initializing agents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

