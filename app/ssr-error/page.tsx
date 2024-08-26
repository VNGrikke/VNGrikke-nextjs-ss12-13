import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SSRPage: React.FC = async () => {
  let posts: Post[] = [];
  let errorMessage: string | null = null;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent-url');
    
    if (!response.ok) {
      throw new Error('Lỗi khi lấy dữ liệu');
    }
    
    posts = await response.json();
    
  } catch (error:any) {
    errorMessage = error.message || 'Có lỗi xảy ra';
  }

  return (
    <div>
      <h1>Xử lý Lỗi với SSR</h1>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SSRPage;
