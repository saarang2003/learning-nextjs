

interface Post {
    id: number;
    title: string;
    body: string;
  }

  interface PostListProps {
    posts: Post[];
  }
  

  const PostList : React.FC<PostListProps> = ({posts}) =>{
    return(
        <div className="space-y-4">
            {
                posts.map((post) =>{
                    return(
                        <div key={post.id} className="p-4 white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p className="mt-2 text-gray-600">{post.body}</p>
                    </div>
                    )
                })
            }
        </div>
    )
  }

  export default PostList;
  