import React, { useState } from 'react';
import { useRouter } from 'next/router';

const BlogForm: React.FC<{ blog?: { id: number; title: string; content: string } }> = ({ blog }) => {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [content, setContent] = useState(blog ? blog.content : '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = blog ? 'PUT' : 'POST';
    const url = blog ? `/api/blogs/${blog.id}` : '/api/blogs';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    router.push('/admin/blogs');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{blog ? 'Edit Blog Post' : 'Add New Blog Post'}</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">{blog ? 'Update' : 'Create'} Blog Post</button>
    </form>
  );
};

export default BlogForm;
