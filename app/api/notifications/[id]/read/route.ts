import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/mongodb';
import Notification from '@/models/Notification';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid notification ID' },
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

    // Update the notification
    const notification = await Notification.findOneAndUpdate(
      { 
        _id: id,
        userId: dbUser._id
      },
      { 
        read: true 
      },
      { 
        new: true 
      }
    );

    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found or not authorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      notification: {
        ...notification.toObject(),
        id: notification._id.toString()
      }
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 