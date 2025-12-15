import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import OpenAI from 'openai';


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

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const agent = await prisma.agent.findUnique({
      where: { id },
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Vérifier que l'utilisateur a accès à cet agent (soit créateur, soit dans la même organisation)
    if (agent.createdById !== user.id) {
      // Vérifier si l'utilisateur est dans la même organisation que le créateur
      const creator = await prisma.user.findUnique({
        where: { id: agent.createdById },
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

      const hasAccess = creator?.organizationMemberships.some((om: any) =>
        om.organization.members.some((m: any) => m.userId === user.id)
      );

      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    // Générer un titre basé sur la première question utilisateur
    let title: string | null = null;
    const firstUserMessage = messages.find((m: any) => m.role === 'user');

    if (firstUserMessage && firstUserMessage.content) {
      try {
        const BASETEN_API_KEY = process.env.BASETEN_API_URL;
        if (BASETEN_API_KEY) {
          const client = new OpenAI({
            apiKey: BASETEN_API_KEY,
            baseURL: 'https://inference.baseten.co/v1',
          });

          const titleResponse = await client.chat.completions.create({
            model: 'openai/gpt-oss-120b',
            messages: [
              {
                role: 'system',
                content: 'Tu es un assistant qui génère des titres courts et descriptifs (maximum 60 caractères) basés sur des questions. Réponds UNIQUEMENT avec le titre, sans guillemets ni ponctuation finale.',
              },
              {
                role: 'user',
                content: `Génère un titre court pour cette question: "${firstUserMessage.content}"`,
              },
            ],
            max_tokens: 50,
            temperature: 0.7,
            stream: false,
          });

          title = titleResponse.choices[0]?.message?.content?.trim() || null;
          // Limiter à 60 caractères
          if (title && title.length > 60) {
            title = title.substring(0, 57) + '...';
          }
        }
      } catch (error) {
        console.error('Error generating title:', error);
        // Si la génération échoue, utiliser les premiers mots de la question
        title = firstUserMessage.content.substring(0, 60).trim();
      }
    }

    const session = await prisma.agentSession.create({
      data: {
        agentId: id,
        userId: user.id,
        title: title || firstUserMessage?.content?.substring(0, 60) || 'Nouvelle conversation',
        messages: JSON.stringify(messages),
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const agent = await prisma.agent.findUnique({
      where: { id },
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Vérifier l'accès
    if (agent.createdById !== user.id && user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const sessions = await prisma.agentSession.findMany({
      where: { agentId: id },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

