// File: pages/api/search.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Sample data for demonstration purposes
const sampleData = [
  { id: 1, title: "Essay Writing", description: "Custom essays tailored to your specific requirements and academic level." },
  { id: 2, title: "Research Papers", description: "In-depth research papers on various topics with proper citations and references." },
  { id: 3, title: "Thesis & Dissertations", description: "Comprehensive support for your thesis or dissertation project." },
  // Add more sample data as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q === 'string') {
    // Filter sample data based on the search query
    const results = sampleData.filter(item =>
      item.title.toLowerCase().includes(q.toLowerCase()) || 
      item.description.toLowerCase().includes(q.toLowerCase())
    );

    // Return the filtered results
    res.status(200).json(results);
  } else {
    // If no query is provided, return an empty array
    res.status(200).json([]);
  }
}