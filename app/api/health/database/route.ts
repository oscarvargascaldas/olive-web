import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      return NextResponse.json(
        { ok: false, database: 'disconnected' },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, database: 'connected' });
  } catch (error) {
    console.error('MongoDB health check failed:', error);
    return NextResponse.json(
      {
        ok: false,
        database: 'unavailable',
        error: 'No se pudo conectar con MongoDB. Revisa MONGODB_URI y el acceso de red en Atlas.',
      },
      { status: 503 },
    );
  }
}
