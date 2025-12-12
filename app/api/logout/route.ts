import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  // Cette route peut être utilisée pour nettoyer les cookies/sessions côté serveur si nécessaire
  // Pour Auth0, la déconnexion se fait principalement côté client
  return NextResponse.json({ success: true, message: 'Logged out' });
}

