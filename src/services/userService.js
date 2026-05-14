import api from "../api/axios";

// ADD USER
export const addUser = async (formData) => {
  const response = await api.post("/Crud-Youtube", formData);
  return response.data;
};

// GET USERS
export const getUsers = async () => {
  const response = await api.get("/Crud-Youtube");
  return response.data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const response = await api.delete(`/Crud-Youtube/${id}`);
  return response.data;
};

// GET SINGLE USER
export const getSingleUser = async (id) => {
  const response = await api.get(`/Crud-Youtube/${id}`);
  return response.data;
};

// UPDATE USER
export const updateUser = async (id, updatedData) => {
  const response = await api.put(`/Crud-Youtube/${id}`, updatedData);
  return response.data;
};
