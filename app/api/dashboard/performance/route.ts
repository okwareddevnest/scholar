import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectDB from '@/lib/mongodb';
import Performance from '@/models/Performance';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get last 7 days of performance data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Last 7 days including today

    const performanceData = await Performance.find({
      userId: user.id,
      date: { $gte: startDate, $lte: endDate },
    })
      .sort({ date: 1 })
      .lean();

    // Format data for chart
    const labels = performanceData.map(data => 
      data.date.toLocaleDateString('en-US', { weekday: 'short' })
    );

    const datasets = [{
      label: 'Performance',
      data: performanceData.map(data => data.metrics.onTimeCompletion),
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
    }];

    return NextResponse.json({ labels, datasets });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 