// pages/api/assignments/submit.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';

interface Assignment {
  id: number;
  title: string;
  description: string;
  studentId: number; // ID of the student submitting the assignment
  status: string; // e.g., "submitted"
  feedback: string; // Feedback provided by the admin
  deadline: string; // Deadline for the assignment
  rate: number; // Rate of the assignment in dollars
}

let assignments: Assignment[] = []; // This would normally be a database

// Enable API to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        return res.status(500).json({ error: 'Form parsing error' });
      }

      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const studentId = Array.isArray(fields.studentId) ? fields.studentId[0] : fields.studentId;
      const deadline = Array.isArray(fields.deadline) ? fields.deadline[0] : fields.deadline;
      const rate = Array.isArray(fields.rate) ? fields.rate[0] : fields.rate;
      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Save the uploaded file to the server
      const uploadDir = path.join(process.cwd(), 'uploads'); // Ensure this directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      const filePath = path.join(uploadDir, file.originalFilename as string);
      fs.renameSync(file.filepath, filePath); // Move the file to the desired location

      const newAssignment: Assignment = {
        id: assignments.length + 1,
        title: title as string,
        description: description as string,
        studentId: Number(studentId),
        status: 'submitted',
        feedback: '',
        deadline: deadline as string,
        rate: Number(rate), // Ensure rate is captured
      };
      assignments.push(newAssignment);
      res.status(201).json(newAssignment);
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}