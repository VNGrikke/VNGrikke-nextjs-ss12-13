import { notFound } from 'next/navigation';
import React from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Props {
    post: Post;
}

const fetchPost = async (id: number): Promise<Post> => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) {
            throw new Error('Lỗi khi lấy dữ liệu');
        }
        return res.json();
    } catch (error) {
        console.error('Lỗi:', error);
        throw new Error('Không thể lấy dữ liệu');
    }
};

const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const postId = parseInt(id);

    try {
        const post = await fetchPost(postId);
        return (
            <div>
                <h1>Chi tiết Bài viết với Static Params</h1>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        );
    } catch (error) {
        notFound();
    }
};

export async function generateStaticParams() {
    const ids = [1, 2, 3];
    return ids.map(id => ({
        id: id.toString(),
    }));
}

export default Page;
