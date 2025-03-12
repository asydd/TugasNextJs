"use client";

import { useState, useEffect } from "react";

interface Room {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/data/rooms.json")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  

  // Filter dan sorting data
  const filteredRooms = rooms
    .filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((room) => (filter === "All" ? true : room.category === filter))
    .sort((a, b) => (a[sort as keyof Room] > b[sort as keyof Room] ? 1 : -1));

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const displayedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Management</h1>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Standard">Standard</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {displayedRooms.map((room) => (
            <tr key={room.id} className="border-t">
              <td className="p-2">{room.name}</td>
              <td className="p-2">{room.category}</td>
              <td className="p-2">${room.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="border px-3 py-1 rounded"
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="border px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}