import type { NextApiRequest, NextApiResponse } from 'next';

interface Assignment {
  id: number;
  title: string;
  description: string;
  studentId: number; // ID of the student who submitted the assignment
  status: string; // e.g., "submitted"
  feedback: string; // Feedback provided by the admin
  deadline: string; // Deadline for the assignment
  rate: number; // Rate of the assignment in dollars
  progress: number; // Progress percentage (0-100%)
}

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

let assignments: Assignment[] = []; // This would normally be a database
let notifications: Notification[] = []; // Store notifications

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      res.status(200).json(assignments);
    } else if (req.method === 'POST') {
      const { title, description, studentId, deadline, rate } = req.body;

      // Validate input
      if (!title || !description || !studentId || !deadline || !rate) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const newAssignment: Assignment = {
        id: assignments.length + 1,
        title,
        description,
        studentId: Number(studentId),
        status: 'submitted',
        feedback: '',
        deadline,
        rate: Number(rate),
        progress: 0, // Initialize progress
      };

      assignments.push(newAssignment);
      notifications.push({
        id: notifications.length + 1,
        message: `Assignment "${newAssignment.title}" submitted successfully.`,
        timestamp: new Date(),
      });
      res.status(201).json(newAssignment);
    } else if (req.method === 'PATCH') {
      const { id, title, description, deadline, rate, progress } = req.body;
      const index = assignments.findIndex(assignment => assignment.id === Number(id));

      if (index !== -1) {
        assignments[index] = {
          ...assignments[index],
          title,
          description,
          deadline,
          rate,
          status: 'submitted',
          progress: progress !== undefined ? Number(progress) : assignments[index].progress, // Update progress if provided
        };
        notifications.push({
          id: notifications.length + 1,
          message: `Assignment "${title}" updated successfully.`,
          timestamp: new Date(),
        });
        res.status(200).json(assignments[index]);
      } else {
        res.status(404).json({ error: 'Assignment not found' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}