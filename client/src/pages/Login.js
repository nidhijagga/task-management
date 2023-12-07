import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Login failed: ${errorMessage}`);
          alert(errorMessage);
        } else {
          const data = await response.json();
          console.log("Login successful:", data);
          dispatch(loginSuccess({ token: data.token }));
          setFormData({
            email: "",
            password: "",
          });

          alert("Login successful!");
          navigate("/private/tasklist");
        }
      } catch (error) {
        console.error("An error occurred during login:", error.message);
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md transition-all"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 transition-all"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 transition-all"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all"
        >
          Login
        </motion.button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
