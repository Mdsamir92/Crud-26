import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { getUsers, deleteUser } from "../services/userService";
import Modal from "./common/Modal";
import Button from "./Button";



const GetUser = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getUsers();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const confirmDelete = async () => {
    try {
      await deleteUser(deleteId);

      fetchData();

      setShowModal(false);
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };


  const filteredData = useMemo(() => {
    return data.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.phone || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // ⭐ Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredData.slice(startIndex, startIndex + itemsPerPage);

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Users Data
      </h2>

      <div>
        <Link to={"/"}>
          <h2 className="text-blue-800 font-semibold text-2xl cursor-pointer">
            Add Users
          </h2>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
          className="border p-2 rounded w-full max-w-md focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Table */}
      <table className="min-w-full text-sm text-left border-collapse rounded-lg overflow-hidden">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="px-6 py-3 font-semibold">#</th>
            <th className="px-6 py-3 font-semibold">Name</th>
            <th className="px-6 py-3 font-semibold">Email</th>
            <th className="px-6 py-3 font-semibold">Phone</th>
            <th className="px-6 py-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition`}
            >
              <td className="px-6 py-3">{startIndex + index + 1}</td>
              <td className="px-6 py-3">{item.name}</td>
              <td className="px-6 py-3">{item.email}</td>
              <td className="px-6 py-3">{item.phone}</td>

              <td className="px-6 py-3 text-center space-x-2">
                <Button
                  onClick={() => navigate(`/update/${item.id}`)}
                  title="Edit"
                  variant="primary"
                />

                {/* <button
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-medium transition"
                >
                  Delete
                </button> */}
                <Button
                  title="Delete"
                  variant="danger"
                  onClick={() => {
                    setDeleteId(item.id);
                    setShowModal(true);
                  }}
                />
                {/* <button
                  onClick={() => {
                    setDeleteId(item.id);
                    setShowModal(true);
                  }}
                  className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-medium transition"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}

          {paginatedUsers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ⭐ Pagination Buttons */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <Button
          title="Prev"
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        />

        <span className="font-semibold text-gray-700">
          {currentPage} / {totalPages}
        </span>

        <Button
          title="Next"
          variant="primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        />
      </div>

      {/* DELETE MODAL */}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Delete User"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-between">
          <button
            onClick={confirmDelete}
            className="
        bg-red-500
        cursor-pointer
        hover:bg-red-600
        text-white
        px-4
        py-2
        rounded-lg
      "
          >
            Yes
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="
        cursor-pointer
        bg-gray-300
        hover:bg-gray-400
        px-4
        py-2
        rounded-lg
      "
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GetUser;
