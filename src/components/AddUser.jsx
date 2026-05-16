import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from "../services/userService";
import Button from './Button';


const PostForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev,
     [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await addUser(formData);

    alert("User Added Successfully");

    navigate("/users");
  } catch (error) {
    console.log(error);

    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            className="w-full"
            title="Add User"
            variant="primary"
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default PostForm;
