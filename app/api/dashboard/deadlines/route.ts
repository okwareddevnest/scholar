import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectDB from '@/lib/mongodb';
import Assignment from '@/models/Assignment';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get upcoming deadlines for assignments that are not completed
    const deadlines = await Assignment.find({
      userId: user.id,
      status: { $ne: 'Completed' },
      dueDate: { $gte: new Date() },
    })
      .sort({ dueDate: 1 })
      .limit(6)
      .lean()
      .then(assignments => assignments.map(assignment => ({
        id: assignment._id.toString(),
        title: assignment.title,
        dueDate: assignment.dueDate.toLocaleDateString(),
        progress: assignment.progress,
        subject: assignment.subject,
      })));

    return NextResponse.json(deadlines);
  } catch (error) {
    console.error('Error fetching upcoming deadlines:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 