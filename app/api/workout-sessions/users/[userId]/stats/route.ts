import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export const runtime = 'edge';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const token = request.headers.get('authorization');

        const response = await fetch(`${API_URL}/api/v2/workout-sessions/users/${userId}/stats`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: token }),
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
