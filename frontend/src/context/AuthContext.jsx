import React, { createContext, useContext, useEffect, useState } from "react";
import { api, setAuthToken } from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");
    
    if (!token) {
      setInitializing(false);
      return;
    }
    setAuthToken(token);
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setAuthToken(null))
      .finally(() => setInitializing(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    setAuthToken(res.data.token);
    setUser({ _id: res.data._id, name: res.data.name, email: res.data.email });
  };

  const register = async (name, email, password) => {
    const res = await api.post("/api/auth/register", { name, email, password });
    setAuthToken(res.data.token);
    setUser({ _id: res.data._id, name: res.data.name, email: res.data.email });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
