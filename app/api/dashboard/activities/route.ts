import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectDB from '@/lib/mongodb';
import Activity from '@/models/Activity';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get recent activities for the user
    const activities = await Activity.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Transform and validate the activities data
    const formattedActivities = activities ? activities.map(activity => ({
      id: activity._id.toString(),
      type: activity.type || 'assignment',
      title: activity.title || 'Untitled Activity',
      date: activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      status: activity.status || 'pending',
      priority: activity.priority,
    })) : [];

    // Always return an array
    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    // Return empty array in case of error
    return NextResponse.json([]);
  }
} 