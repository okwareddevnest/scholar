// pages/api/user/profile.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch user profile logic
    const userProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      notificationPreferences: {
        emailNotifications: true,
        smsNotifications: false,
      },
      profilePicture: null, // Handle profile picture as needed
    };
    res.status(200).json(userProfile);
  } else if (req.method === 'PUT') {
    // Update user profile logic
    const { name, email, password, notificationPreferences } = req.body;
    // Save the updated profile to the database or similar
    res.status(200).json({ message: 'Profile updated successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}