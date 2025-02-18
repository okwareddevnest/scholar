import { NextResponse } from 'next/server';
import { getIO } from '@/lib/socket';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const io = getIO();
  return NextResponse.json(
    { message: 'Socket.IO server is running' },
    { status: 200 }
  );
}

export async function POST() {
  const io = getIO();
  return NextResponse.json(
    { message: 'Socket.IO server is running' },
    { status: 200 }
  );
} 