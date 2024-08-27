"use client"
import React, { useState, useEffect } from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    return (
        <div>
            <h1>Tìm Kiếm Bài viết (CSR)</h1>
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
            {filteredPosts.length > 0 ? (
                <ul>
                    {filteredPosts.map((post) => (
                        <li key={post.id}>
                            <div><b>Tiêu đề</b>: {post.title}</div>
                            <div className="max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
                                <b>Nội dung</b>: {post.body}
                            </div>
                            <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có bài viết nào phù hợp với từ khóa tìm kiếm.</p>
            )}
        </div>
    );
}
