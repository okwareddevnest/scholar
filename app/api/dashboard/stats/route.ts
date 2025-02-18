import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectDB from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import Performance from '@/models/Performance';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get current date and start of month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get active and completed assignments
    const [activeAssignments, completedAssignments] = await Promise.all([
      Assignment.countDocuments({
        userId: user.id,
        status: { $in: ['Not Started', 'In Progress'] },
      }),
      Assignment.countDocuments({
        userId: user.id,
        status: 'Completed',
      }),
    ]);

    // Get monthly performance metrics
    const monthlyPerformance = await Performance.getPerformanceData(
      user.id,
      startOfMonth,
      now
    );

    const stats = {
      activeAssignments,
      completedAssignments,
      totalSpent: 0, // TODO: Implement payment tracking
      averageRating: monthlyPerformance[0]?.averageRating || 0,
      monthlyProgress: monthlyPerformance[0]?.averageOnTimeCompletion || 0,
      totalEarnings: monthlyPerformance[0]?.totalEarnings || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 