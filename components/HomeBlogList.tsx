"use client";

import React from 'react';

interface Blog {
  id: number;
  title: string;
  content: string;
}

interface HomeBlogListProps {
  blogs: Blog[];
}

const HomeBlogList: React.FC<HomeBlogListProps> = ({ blogs }) => {
  return (
    <div>
      <h2>Latest Blog Posts</h2>
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

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/blogs'); // Adjust the URL as needed
  const data = await response.json();

  return {
    props: {
      blogs: data,
    },
  };
}

export default HomeBlogList;