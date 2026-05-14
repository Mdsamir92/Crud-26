import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleUser, updateUser } from "../services/userService";
import Button from "./common/Button";

const UserUpdate = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user with id
  // const fetchUser = async () => {
  //   try {
  //    const res = await axios.get(`https://632c652f5568d3cad884c4bc.mockapi.io/Crud-Youtube/${id}`);
  //     setFormData({
  //       name: res.data.name,
  //       email: res.data.email,
  //       phone: res.data.phone || "",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchUser = async () => {
    try {
 
      const userData = await getSingleUser(id);

      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
      });
    } catch (err) {
      console.error("Fetch User Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleUpdate = async () => {
  //   try {
  //     await axios.put(
  //       `https://632c652f5568d3cad884c4bc.mockapi.io/Crud-Youtube/${id}`,
  //       formData
  //     );
  //     alert("User updated successfully!");
  //     navigate("/users");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      await updateUser(id, formData);

      alert("User updated successfully!");

      navigate("/users");
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Update User
        </h2>

        <div className="flex flex-col gap-4">
          
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Button */}
          <Button
           onClick={handleUpdate}
           title="Update User"
           variant="success"
          />
        
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
