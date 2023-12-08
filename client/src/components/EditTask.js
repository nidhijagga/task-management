import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksAsync,
  selectTaskById,
  updateTaskAsync,
} from '../redux/slices/taskSlice';

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const task = useSelector((state) => selectTaskById(state, id));
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setEditedTask({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
      });
    } else {
      navigate("/private/task-list");
    }
  }, [task, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!editedTask.title.trim()) {
      validationErrors.title = "Title cannot be empty";
    }
    if (!editedTask.description.trim()) {
      validationErrors.description = "Description cannot be empty";
    }
    const currentDate = new Date().toISOString().split("T")[0];
    if (editedTask.dueDate < currentDate) {
      validationErrors.dueDate = "Due date should not be in the past";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(updateTaskAsync({id, ...editedTask}));
      console.log("Task updated successfully!");
      dispatch(fetchTasksAsync());
      navigate("/private/task-list");
    } catch (error) {
      console.error("An error occurred while updating the task:", error.message);
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
        Edit Task
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
            value={editedTask.title}
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
            value={editedTask.description}
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
            value={editedTask.dueDate}
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
          Update Task
        </button>
      </form>
    </motion.div>
  );
};

export default EditTask;
