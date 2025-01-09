"use client";

import React, { useEffect, useState } from 'react';

interface Blog {
  id: number;
  title: string;
  content: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <a href={`/admin/blogs/edit/${blog.id}`}>Read More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
