// app/page.tsx
// 'use client'
import { FC } from 'react';
import PostList from './components/PostList';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  posts: Post[];
}

// This is a Server Component (no 'use client' directive)
const Page: FC<PageProps> = async () => {
  // Fetching data directly in the component
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Fetched Posts (SSR)</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Page;
