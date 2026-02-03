import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [roles, setRoles] = useState(
    JSON.parse(localStorage.getItem("roles")) || []
  );

  const login = (token, roles) => {
    // console.log("SAVING TOKEN:", token);
    // console.log("SAVING ROLES:", roles);

    localStorage.setItem("token", token);
    localStorage.setItem("roles", JSON.stringify(roles));

    setToken(token);
    setRoles(roles);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);