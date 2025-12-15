import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3000';


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const token = request.headers.get('authorization');
        const { searchParams } = new URL(request.url);

        const queryString = searchParams.toString();
        const url = `${API_URL}/api/v2/workout-sessions/users/${userId}${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
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

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const token = request.headers.get('authorization');
        const body = await request.json();

        const response = await fetch(`${API_URL}/api/v2/workout-sessions/users/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: token }),
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
