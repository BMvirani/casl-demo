"use client";
import { useAuth } from "@/app/providers/AuthContext";
import React, { useEffect, useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useAuth();
  const [error, setError] = useState(null);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      return;
    }
  }, [setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    CheckUserAuth();
  };

  const users = [
    {
      id: 1,
      email: "admin@gmail.com",
      password: 123,
      userType: "admin",
    },
    {
      id: 2,
      email: "emp@gmail.com",
      password: 1234,
      userType: "employee",
    },
    {
      id: 3,
      email: "customer@gmail.com",
      password: 12345,
      userType: "customer",
    },
    {
      id: 3,
      email: "other@gmail.com",
      password: 123456,
      userType: "other",
    },
  ];

  const CheckUserAuth = () => {
    const foundUser = users.find((item) => item.email === formData.email);

    if (foundUser) {
      if (
        foundUser.email == formData.email &&
        foundUser.password == formData.password
      ) {
        setUser({ role: foundUser.userType });
        localStorage.setItem(
          "user",
          JSON.stringify({ role: foundUser.userType })
        );
        setFormData("");
      } else {
        setError("Invalid  password");
      }
    } else {
      setError("User not Found");
    }
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div className="login-form-wrap">
        {!user ? (
          <>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-field-box">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="login-field"
                />
              </div>
              <div className="login-form-field-box">
                <input
                  className="login-field"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <div className="login-btn-box">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="logout-box">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;
