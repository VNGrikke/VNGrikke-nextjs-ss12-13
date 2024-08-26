"use client"
import React, { useEffect, useState } from 'react'

export default function page() {
    const [users, setUser] = useState<any>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(err => {
                console.log("err", err);
            })
    }, [])
  return (
    <div>
        <h1>Danh sách người dùng (CSR)</h1>
        <div>page
            {users.map((item: any) => {
                return <li>{item.name}
                </li>
            })}
        </div>

    </div>
  )
}
