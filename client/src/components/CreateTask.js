import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!newTask.title.trim()) {
      validationErrors.title = "Title cannot be empty";
    }
    if (!newTask.description.trim()) {
      validationErrors.description = "Description cannot be empty";
    }
    const currentDate = new Date().toISOString().split("T")[0];
    if (newTask.dueDate < currentDate) {
      validationErrors.dueDate = "Due date should not be in the past";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/task/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Failed to create task: ${errorMessage}`);
      } else {
        console.log("New Task created successfully!");

        navigate("/private/task-list");
      }
    } catch (error) {
      console.error(
        "An error occurred while creating the task:",
        error.message
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md transition-all"
    >
      <button
        className="text-indigo-500 hover:underline mb-4 text-2xl"
        onClick={() => navigate("/private/task-list")}
      >
        🔙
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 ${
              errors.title && "border-red-500"
            }`}
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            rows="3"
            className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 ${
              errors.description && "border-red-500"
            }`}
            required
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleChange}
            className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 ${
              errors.dueDate && "border-red-500"
            }`}
            required
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all"
        >
          Create Task
        </button>
      </form>
    </motion.div>
  );
};

export default CreateTask;
