import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}


export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params; 

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  
  const post: Post = await response.json();

  return (
    <div>
      <h1>Chi tiết Bài viết</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Không có bài viết này.</p>
      )}
    </div>
  );
}
