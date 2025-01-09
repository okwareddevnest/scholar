import React, { useEffect, useState } from 'react';
import BlogForm from '../../../../components/BlogForm';
import { useRouter } from 'next/router';

const EditBlogPage: React.FC = () => {
  const [blog, setBlog] = useState<{ id: number; title: string; content: string } | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return <BlogForm blog={blog} />;
};

export default EditBlogPage;
