import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const dummyTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      dueDate: '2023-12-31',
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: '2023-12-15',
      completed: true,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      dueDate: '2023-12-20',
      completed: false,
    },
  ];

  useEffect(() => {
    setTasks(dummyTasks);
  }, []);

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md transition-all"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">Task List</h2>

      <Link
        to="/private/create-task"
        className="block text-center mb-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all"
      >
        Create New Task
      </Link>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-6 p-4 border rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-600 mt-2">Due Date: {task.dueDate}</p>
              <p className={`text-${task.completed ? 'green' : 'red'}-500 mt-2`}>
                Status: {task.completed ? 'Completed' : 'Not Completed'}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => toggleStatus(task.id)}
                  className={`${
                    task.completed ? 'bg-blue-300' : 'bg-purple-500'
                  } text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-all`}
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <div className="space-x-2">
                  <Link
                    to={`/edit-task/${task.id}`}
                    className="text-purple-500 hover:text-blue-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default TaskList;
