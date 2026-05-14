import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

const { logout } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-5">Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-5 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
