// pages/api/tasks.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface Task {
  id: number;
  title: string;
  description: string;
  writerId: number; // ID of the writer the task is assigned to
  completed: boolean; // Track if the task is completed
  deadline: string; // Deadline for the task
}

let tasks: Task[] = []; // This would normally be a database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newTask: Task = { id: tasks.length + 1, completed: false, ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}