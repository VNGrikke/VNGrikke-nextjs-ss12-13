"use client";

import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!response.ok) {
          throw new Error("Lỗi tải dữ liệu");
        }
        const data = await response.json();
        setPosts(data); 
      } catch (err) {
        console.log("Lỗi tải dữ liệu");
      }
    };

    fetchData(); 
  }, []);

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      {posts.length > 0 ? (
        posts.map((item) => (
          <div key={item.id}>
            <div><b>Tiêu đề</b>: {item.title}</div>
            <div className="max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
              <b>Nội dung</b>: {item.body}
            </div>
            <br />
          </div>
        ))
      ) : (
        <p>Đang tải dữ liệu</p>
      )}
    </div>
  );
}
