"use client";

import { useState, useEffect } from "react";

// Data Dummy yang Diperbarui
const initialBookings = [
  {
    id: 1,
    name: "Aceng Ziran",
    room: "Deluxe Room",
    date: "2025-03-12",
    status: "Confirmed",
    price: 500000,
  },
  {
    id: 2,
    name: "Dimas Novi",
    room: "Suite Room",
    date: "2025-03-13",
    status: "Pending",
    price: 800000,
  },
  {
    id: 3,
    name: "Tazkia Hidayatulloh",
    room: "Standard Room",
    date: "2025-03-14",
    status: "Cancelled",
    price: 300000,
  },
];

// Komponen utama BookingPage
export default function BookingPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<null | typeof initialBookings[0]>(null);

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
      price: parseInt(formData.get("price") as string),
    };
    setBookings([...bookings, newBooking]);
    setIsAdding(false);
    e.currentTarget.reset();
  };

  // Fungsi untuk mengedit booking
  const editBooking = (id: number) => {
    const bookingToEdit = bookings.find((b) => b.id === id);
    if (bookingToEdit) {
      setCurrentBooking(bookingToEdit);
      setIsEditing(true);
    }
  };

  const saveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentBooking) return;

    const formData = new FormData(e.currentTarget);
    const updatedBooking = {
      id: currentBooking.id,
      name: formData.get("name") as string,
      room: formData.get("room") as string,
      date: formData.get("date") as string,
      status: formData.get("status") as string,
      price: parseInt(formData.get("price") as string),
    };
    setBookings(bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
    setIsEditing(false);
    setCurrentBooking(null);
    e.currentTarget.reset();
  };

  // Fungsi untuk menghapus booking
  const deleteBooking = (id: number) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  // Fungsi untuk filter, search, dan sort
  const filteredBookings = bookings
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (filterStatus ? b.status === filterStatus : true))
    .sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Management</h1>

      {/* Tombol Tambah Booking */}
      {!isAdding && !isEditing && (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition mb-6"
        >
          Add New Booking
        </button>
      )}

      {/* Formulir Booking */}
      {(isAdding || isEditing) && (
        <form
          onSubmit={isAdding ? addBooking : saveEdit}
          className="mb-6 space-y-4 border p-6 rounded-lg shadow-lg bg-white"
        >
          <h2 className="text-xl font-semibold">
            {isAdding ? "Add New Booking" : "Edit Booking"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              defaultValue={isEditing ? currentBooking?.name : ""}
              placeholder="Guest Name"
              required
              className="border p-3 rounded w-full"
            />
            <input
              name="room"
              type="text"
              defaultValue={isEditing ? currentBooking?.room : ""}
              placeholder="Room Type"
              required
              className="border p-3 rounded w-full"
            />
            <input
              name="date"
              type="date"
              defaultValue={isEditing ? currentBooking?.date : ""}
              required
              className="border p-3 rounded w-full"
            />
            <select
              name="status"
              defaultValue={isEditing ? currentBooking?.status : ""}
              required
              className="border p-3 rounded w-full"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <input
              name="price"
              type="number"
              defaultValue={isEditing ? currentBooking?.price : ""}
              placeholder="Price"
              required
              className="border p-3 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            {isAdding ? "Add Booking" : "Save Changes"}
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setIsEditing(false);
              setCurrentBooking(null);
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded w-full hover:bg-gray-400 transition mt-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Filter & Search */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded w-64 text-center"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-3 rounded w-40 text-center"
        >
          <option value="">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="border px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Sort {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </button>
      </div>

      {/* Tabel Booking */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-center">Room</th>
              <th className="p-3 text-center">Booking Date</th>
              <th className="p-3 text-center">Booked By</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{booking.room}</td>
                <td className="p-3 text-center">{booking.date}</td>
                <td className="p-3 text-center">{booking.name}</td>
                <td className="p-3 text-center">Rp{booking.price.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => editBooking(booking.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}