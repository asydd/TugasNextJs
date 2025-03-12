"use client";

import { useState, useEffect } from "react";

// Data Dummy
const dummyBookings = [
  { id: 1, name: "John Doe", room: "Deluxe", date: "2024-03-15", status: "Confirmed" },
  { id: 2, name: "Jane Smith", room: "Suite", date: "2024-03-16", status: "Pending" },
  { id: 3, name: "Alice Brown", room: "Standard", date: "2024-03-17", status: "Cancelled" },
];

// Komponen utama BookingPage
export default function BookingPage() {
  const [bookings, setBookings] = useState(dummyBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fungsi untuk menambah booking baru
  const addBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBooking = {
      id: bookings.length + 1,
      name: formData.get("name") as string,
      room: formData.get("room") as string,
      date: formData.get("date") as string,
      status: formData.get("status") as string,
    };
    setBookings([...bookings, newBooking]);
    e.currentTarget.reset();
  };

  // Fungsi untuk filter, search, dan sort
  const filteredBookings = bookings
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (filterStatus ? b.status === filterStatus : true))
    .sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>

      {/* Formulir Booking */}
      <form onSubmit={addBooking} className="mb-6 space-y-3 border p-4 rounded-lg">
        <input name="name" type="text" placeholder="Guest Name" required className="border p-2 rounded w-full" />
        <input name="room" type="text" placeholder="Room Type" required className="border p-2 rounded w-full" />
        <input name="date" type="date" required className="border p-2 rounded w-full" />
        <select name="status" required className="border p-2 rounded w-full">
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Booking</button>
      </form>

      {/* Filter & Search */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="border p-2 rounded">
          Sort {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </button>
      </div>

      {/* Tabel Booking */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Room</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id} className="border">
              <td className="border p-2">{booking.name}</td>
              <td className="border p-2">{booking.room}</td>
              <td className="border p-2">{booking.date}</td>
              <td className="border p-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
