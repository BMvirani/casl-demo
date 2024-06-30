"use client"
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider {...props} value={{ user, setUser }} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
