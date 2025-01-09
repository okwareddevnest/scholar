import { NextApiRequest, NextApiResponse } from 'next';

let blogs = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const blogId = parseInt(id as string);

  if (req.method === 'GET') {
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    if (blogIndex !== -1) {
      blogs[blogIndex] = { id: blogId, title, content };
      res.status(200).json(blogs[blogIndex]);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } else if (req.method === 'DELETE') {
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    if (blogIndex !== -1) {
      blogs.splice(blogIndex, 1);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
