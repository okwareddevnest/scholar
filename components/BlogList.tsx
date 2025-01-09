import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <Link href="/admin/blogs/new">Add New Blog Post</Link>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/admin/blogs/edit/${blog.id}`}>{blog.title}</Link>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
