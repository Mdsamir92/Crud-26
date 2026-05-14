import { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});


  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name required";
    }

    if (!formData.email) {
      newErrors.email = "Email required";
    }

    if (!formData.password) {
      newErrors.password = "Password required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSignup = async (e) => {
  e.preventDefault();

  try {
    if (!validate()) return;

    await signupUser(formData);

    alert("Signup Successful");

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] shadow-lg p-6 rounded">
        <h2 className="text-3xl font-bold mb-5 text-center">Signup</h2>

        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors.email}
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
              {showPassword ? <FiEyeOff/> : <FiEye/>}
            </button>
          </div>

          <button
            onClick={handleSignup}
            className="cursor-pointer bg-blue-500 text-white w-full py-3 rounded"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
