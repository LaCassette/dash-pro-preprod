import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

// Removed edge runtime for Auth0 compatibility

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'PRO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const BASETEN_API_KEY = process.env.BASETEN_API_KEY;
    if (!BASETEN_API_KEY) {
      return NextResponse.json(
        { error: 'Baseten API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      messages,
      model = 'openai/gpt-oss-120b',
      stream = true,
      stream_options = {
        include_usage: true,
        continuous_usage_stats: true,
      },
      top_p = 1,
      max_tokens = 10000, // Limite Baseten: 3000 tokens max, on garde une marge de sécurité
      temperature = 1,
      presence_penalty = 0,
      frequency_penalty = 0,
    } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: BASETEN_API_KEY,
      baseURL: 'https://inference.baseten.co/v1',
    });

    // Si streaming, retourner un stream
    if (stream) {
      const response = await client.chat.completions.create({
        model,
        messages,
        stream: true,
        stream_options,
        top_p,
        max_tokens,
        temperature,
        presence_penalty,
        frequency_penalty,
      });

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            }
            controller.close();
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Si pas de streaming, retourner la réponse complète
    const response = await client.chat.completions.create({
      model,
      messages,
      stream: false,
      top_p,
      max_tokens,
      temperature,
      presence_penalty,
      frequency_penalty,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error calling Baseten API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

