import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/data/types";
import { mockUsers } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (fullName: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    const found = mockUsers.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // For demo: any email logs in as student
    const newUser: User = {
      id: Date.now().toString(),
      fullName: email.split("@")[0],
      email,
      role: "student",
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const register = (fullName: string, email: string, _password: string, role: UserRole) => {
    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      role,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
