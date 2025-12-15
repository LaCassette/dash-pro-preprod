import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:23945';


export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('authorization');
        const { searchParams } = new URL(request.url);

        const queryString = searchParams.toString();
        const url = `${API_URL}/api/v2/exercises${queryString ? `?${queryString}` : ''}`;

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
