import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleLogin = async () => {
  try {
    const user = await loginUser(formData.email, formData.password);

    login(user);

    navigate("/users");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] shadow-lg p-6 rounded">
        <h2 className="text-3xl font-bold mb-5 text-center">Login</h2>

        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute right-3 top-1/2 -translate-y-1/2 "
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="cursor-pointer bg-blue-500 text-white w-full py-3 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
