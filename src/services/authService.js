import api from "../api/axios";

// SIGNUP
export const signupUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// LOGIN
export const loginUser = async (email, password) => {
  const response = await api.get("/users");

  const user = response.data.find(
    (item) => item.email === email && item.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
  }
  return user;
};
