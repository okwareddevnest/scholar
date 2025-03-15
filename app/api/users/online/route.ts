import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// In-memory store for online users (in a production app, use Redis)
const onlineUsers = new Map();

// Update user's online status
export function updateUserOnlineStatus(userId: string, isOnline: boolean, userData?: any) {
  if (isOnline) {
    onlineUsers.set(userId, {
      ...userData,
      lastActive: new Date()
    });
  } else {
    onlineUsers.delete(userId);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find the user in our database
    const dbUser = await User.findOne({ kindeId: user.id });
    
    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update current user's online status
    updateUserOnlineStatus(dbUser._id.toString(), true, {
      id: dbUser._id.toString(),
      name: `${dbUser.firstName || ''} ${dbUser.lastName || ''}`.trim() || dbUser.email,
      picture: dbUser.picture,
      role: dbUser.role
    });

    // Get all online users
    const users = Array.from(onlineUsers.entries()).map(([id, data]) => ({
      id,
      name: data.name,
      picture: data.picture,
      lastActive: data.lastActive,
      role: data.role
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching online users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 