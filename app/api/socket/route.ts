import { NextResponse } from 'next/server';
import { getIO } from '@/lib/socket';

export async function GET() {
  try {
    const io = getIO();
    return new NextResponse('Socket server is running', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error initializing socket:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 