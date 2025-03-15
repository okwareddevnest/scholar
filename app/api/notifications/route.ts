import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/mongodb';
import Notification from '@/models/Notification';
import User from '@/models/User';

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

    // Get notifications for this user
    const notifications = await Notification.find({ 
      userId: dbUser._id
    })
    .sort({ timestamp: -1 })
    .limit(20)
    .lean();

    return NextResponse.json({ 
      notifications: notifications.map(notification => ({
        ...notification,
        id: notification._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { type, title, message } = body;

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
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

    // Create new notification
    const notification = await Notification.create({
      type,
      title,
      message,
      userId: dbUser._id,
      timestamp: new Date(),
      read: false
    });

    // If we have socket.io server running, emit the new notification
    if (global.io) {
      global.io.to(`user-${dbUser._id}`).emit('notification-created', {
        ...notification.toObject(),
        id: notification._id.toString()
      });
    }

    return NextResponse.json({ 
      notification: {
        ...notification.toObject(),
        id: notification._id.toString()
      }
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 