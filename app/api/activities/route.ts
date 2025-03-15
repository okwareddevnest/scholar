import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/mongodb';
import Activity from '@/models/Activity';
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

    // Get activities for this user
    const activities = await Activity.find({ 
      $or: [
        { userId: dbUser._id },
        { relatedUserId: dbUser._id }
      ]
    })
    .sort({ timestamp: -1 })
    .limit(20)
    .lean();

    return NextResponse.json({ 
      activities: activities.map(activity => ({
        ...activity,
        id: activity._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
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
    const { type, title, description, status, relatedUserId } = body;

    if (!type || !title || !description) {
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

    // Create new activity
    const activity = await Activity.create({
      type,
      title,
      description,
      status,
      userId: dbUser._id,
      relatedUserId: relatedUserId || null,
      timestamp: new Date()
    });

    // If we have socket.io server running, emit the new activity
    if (global.io) {
      global.io.to(`user-${dbUser._id}`).emit('activity-created', {
        ...activity.toObject(),
        id: activity._id.toString()
      });

      // If there's a related user, also emit to their room
      if (relatedUserId) {
        global.io.to(`user-${relatedUserId}`).emit('activity-created', {
          ...activity.toObject(),
          id: activity._id.toString()
        });
      }
    }

    return NextResponse.json({ 
      activity: {
        ...activity.toObject(),
        id: activity._id.toString()
      }
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 