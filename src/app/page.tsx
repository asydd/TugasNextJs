import React from 'react';

const Dashboard = () => {
  // Data dummy untuk ditampilkan di dashboard
  const summaryData = [
    { title: 'Total Rooms', value: 15, color: 'bg-blue-500' },
    { title: 'Total Users', value: 50, color: 'bg-green-500' },
    { title: 'Total Transactions', value: 120, color: 'bg-yellow-500' },
  ];

  const tableData = [
    { id: 1, room: 'Room 1', user: 'Home Ramdan', status: 'Booked' },
    { id: 2, room: 'Room 2', user: 'Pasar Ampera', status: 'Available' },
    { id: 3, room: 'Room 3', user: 'Jb Purbaratu', status: 'Available' },
    { id: 4, room: 'Room 4', user: 'Sukaratu', status: 'Available' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Navbar</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${item.color} text-white`}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-2xl">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.status === 'Booked' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Booked
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;