
import React from "react";
import PostList from "./components/PostList";

interface Post{
  id : number;
  title : string;
  body : string;
}

interface PageProps {
  posts: Post[];
}


const Page : React.FC<PageProps> = ({posts}) =>{
  return(
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Fetched Posts</h1>
    <PostList posts={posts} />
    </div>
  )
};

// Fetch data on the server side using getServerSideProps
export async function getServerSideProps(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();

    return {
      props : {
        posts,
      }
    }
}


export default Page;