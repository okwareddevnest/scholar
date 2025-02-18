import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectDB from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import Activity from '@/models/Activity';
import { getIO } from '@/lib/socket';

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    const assignment = await Assignment.create({
      ...data,
      userId: user.id,
    });

    const activity = await Activity.create({
      userId: user.id,
      type: 'assignment',
      title: `New assignment created: ${data.title}`,
      status: 'pending',
      relatedId: assignment._id.toString(),
      refModel: 'Assignment',
    });

    // Get updated stats for real-time updates
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

    // Get updated deadlines
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

    // Emit socket events
    const io = getIO();
    if (io) {
      io.to(`user-${user.id}`).emit('assignment-updated', {
        activeAssignments,
        completedAssignments,
        deadlines,
      });

      io.to(`user-${user.id}`).emit('activity-created', {
        id: activity._id.toString(),
        type: activity.type,
        title: activity.title,
        date: activity.createdAt.toLocaleDateString(),
        status: activity.status,
      });
    }

    return NextResponse.json({ assignment, activity });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const assignments = await Assignment.find({
      userId: user.id,
    })
      .sort({ createdAt: -1 })
      .lean()
      .then(assignments => assignments.map(assignment => ({
        id: assignment._id.toString(),
        title: assignment.title,
        subject: assignment.subject,
        description: assignment.description,
        dueDate: assignment.dueDate.toLocaleDateString(),
        status: assignment.status,
        priority: assignment.priority,
        progress: assignment.progress,
      })));

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 