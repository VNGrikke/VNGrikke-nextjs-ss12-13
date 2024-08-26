"use client"
import React, { useState, useEffect } from 'react';

const POSTS_PER_PAGE = 5;


export default function page() {
    const [posts, setPosts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy dữ liệu');
                }
                const data = await response.json();
                setPosts(data);
                setTotalPages(Math.ceil(data.length / POSTS_PER_PAGE));
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return (
        <div>
            <h1>Phân Trang với CSR</h1>
            <br />
            <ul>
                {currentPosts.map(item => (
                    <li key={item.id}>
                        <div><b>Tiêu đề</b>: {item.title}</div>
                        <div className="max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
                            <b>Nội dung</b>: {item.body}
                        </div>
                        <br />
                    </li>
                ))}
            </ul>
            <div>
                <button className='py-1, px-2' onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                <button className='py-1, px-2' onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
                <span>Trang {currentPage} / {totalPages}</span>

            </div>
        </div>
    );
};

