"use client";

import { useState, useEffect } from "react";

// Interface untuk data
interface Room {
  id: number;
  name: string;
  capacity: number;
  category: string;
  price: number;
  status: "Approved" | "Pending" | "Rejected";
}

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Approved" | "Pending" | "Rejected"
  >("All");
  const itemsPerPage = 5;

  // State untuk Form Create & Edit
  const [newRoom, setNewRoom] = useState<Room>({
    id: 0,
    name: "",
    capacity: 0,
    category: "",
    price: 0,
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data dari JSON
  useEffect(() => {
    fetch("/data/rooms.json")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  // Fungsi CRUD
  const handleApprove = (id: number) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, status: "Approved" } : room
      )
    );
  };

  const handleReject = (id: number) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, status: "Rejected" } : room
      )
    );
  };

  const handleDelete = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const handleCreate = () => {
    if (
      !newRoom.name ||
      !newRoom.category ||
      newRoom.capacity <= 0 ||
      newRoom.price <= 0
    ) {
      alert("Semua field harus diisi dengan benar!");
      return;
    }

    if (isEditing) {
      setRooms(
        rooms.map((room) =>
          room.id === newRoom.id
            ? { ...newRoom, status: newRoom.status as "Approved" | "Pending" | "Rejected" }
            : room
        )
      );
      setIsEditing(false);
    } else {
      const newId = rooms.length ? Math.max(...rooms.map((room) => room.id)) + 1 : 1;
      setRooms([
        ...rooms,
        { ...newRoom, id: newId, status: newRoom.status as "Approved" | "Pending" | "Rejected" },
      ]);
    }

    // Reset Form
    setNewRoom({ id: 0, name: "", capacity: 0, category: "", price: 0, status: "Pending" });
  };

  const handleEdit = (room: Room) => {
    setNewRoom(room);
    setIsEditing(true);
  };

  // Filter dan Sorting
  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || room.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (a[sort as keyof Room] > b[sort as keyof Room]) return 1;
      if (a[sort as keyof Room] < b[sort as keyof Room]) return -1;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const displayedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manajemen Ruangan</h1>

      {/* Search, Filter, dan Sorting */}
      <div className="mb-4 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Cari nama ruangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value as "All" | "Approved" | "Pending" | "Rejected"
            )
          }
          className="border p-2 rounded"
        >
          <option value="All">Semua Status</option>
          <option value="Approved">Disetujui</option>
          <option value="Pending">Menunggu</option>
          <option value="Rejected">Ditolak</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Nama</option>
          <option value="capacity">Kapasitas</option>
          <option value="category">Kategori</option>
          <option value="price">Harga</option>
        </select>
      </div>

      {/* Form Tambah/Edit Ruangan */}
      <div className="mb-6 bg-gray-100 p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Ruangan" : "Tambah Ruangan"}
        </h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Nama Ruangan"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            className="border p-2 rounded w-48"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newRoom.capacity}
            onChange={(e) => setNewRoom({ ...newRoom, capacity: +e.target.value })}
            className="border p-2 rounded w-32"
          />
          <input
            type="text"
            placeholder="Category"
            value={newRoom.category}
            onChange={(e) => setNewRoom({ ...newRoom, category: e.target.value })}
            className="border p-2 rounded w-48"
          />
          <input
            type="number"
            placeholder="Price"
            value={newRoom.price}
            onChange={(e) => setNewRoom({ ...newRoom, price: +e.target.value })}
            className="border p-2 rounded w-32"
          />
          <button
            onClick={handleCreate}
            className={`px-4 py-2 rounded text-white ${
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEditing ? "Update" : "Tambah"}
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-center">Nama</th>
              <th className="p-3 text-center">Capacity</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedRooms.map((room, index) => (
              <tr
                key={room.id}
                className={`border-t ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{room.name}</td>
                <td className="p-3 text-center">{room.capacity}</td>
                <td className="p-3 text-center">{room.category}</td>
                <td className="p-3 text-center">${room.price}</td>
                <td
                  className={`p-3 text-center font-semibold ${
                    room.status === "Approved"
                      ? "text-green-600"
                      : room.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {room.status}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleApprove(room.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(room.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Previous
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}