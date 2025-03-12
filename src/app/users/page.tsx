'use client';

import { useEffect, useState, useMemo } from "react";

export default function User() {
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 2; // Jumlah item per halaman

    useEffect(() => {
        fetch("/users.json")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Data format is incorrect:", data);
                    setUsers([]);
                }
            })
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    // Filter data berdasarkan pencarian
    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            user?.email?.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = useMemo(() => {
        const start = page * pageSize;
        return filteredUsers.slice(start, start + pageSize);
    }, [filteredUsers, page, pageSize]);

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <input
                type="text"
                placeholder="Search..."
                className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0); // Reset ke halaman pertama saat mencari
                }}
            />
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user, index) => (
                            <tr key={index} className="text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{user.id || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{user.name || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{user.email || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-2 text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-4">
                {/* Previous Button */}
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className={`flex items-center px-4 py-2 text-white rounded-lg transition-all duration-300
                        ${page === 0 ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Prev
                </button>

                <span className="font-semibold text-gray-700">
                    Page {page + 1} of {totalPages}
                </span>

                {/* Next Button */}
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page === totalPages - 1}
                    className={`flex items-center px-4 py-2 text-white rounded-lg transition-all duration-300
                        ${page === totalPages - 1 ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
