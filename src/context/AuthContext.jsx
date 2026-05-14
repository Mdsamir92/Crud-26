import { createContext, useContext, useEffect, useState } from "react";

// CREATE CONTEXT
const AuthContext = createContext();

// PROVIDER
export const AuthProvider = ({ children }) => {
    
  const [user, setUser] = useState(null);

  // CHECK LOCAL STORAGE ON REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN FUNCTION
  const login = (userData) => {
    localStorage.setItem("token", JSON.stringify(userData));
    setUser(userData);
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  return useContext(AuthContext);
};
