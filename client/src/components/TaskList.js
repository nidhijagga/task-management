import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  fetchTasksAsync,
  selectTasks,
  selectTasksStatus,
  toggleTaskStatusAsync,
} from "../redux/slices/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const status = useSelector(selectTasksStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch, status]);

  const toggleStatus = (taskId, completed) => {
    dispatch(toggleTaskStatusAsync(taskId, { completed }));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md transition-all"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">
        Task List
      </h2>

      <Link
        to="/private/create-task"
        className="block text-center mb-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all"
      >
        Create New Task
      </Link>

      {status === "loading" && <p>Loading tasks...</p>}
      {/* {status === 'failed' && <p>Error fetching tasks: {error}</p>} */}
      {status === "succeeded" && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-6 p-4 border rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-600 mt-2">
                Due Date: {formatDate(task.dueDate)}
              </p>
              <p
                className={`text-${
                  task.status === "Completed" ? "green" : "red"
                }-500 mt-2`}
              >
                Status:{" "}
                {task.status === "Completed" ? "Completed" : "Not Completed"}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    toggleStatus(
                      task.id,
                      task.status === "Completed"
                        ? "Not Completed"
                        : "Completed"
                    )
                  }
                  className={`${
                    task.status === "Completed"
                      ? "bg-blue-300"
                      : "bg-purple-500"
                  } text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-all`}
                >
                  {task.status === "Completed"
                    ? "Mark Incomplete"
                    : "Mark Complete"}
                </button>

                <div className="space-x-2">
                  <Link
                    to={`/private/edit-task/${task.id}`}
                    className="text-purple-500 hover:text-blue-500"
                  >
                    Edit
                  </Link>
                  <button
                    // onClick={() => deleteTask(task.id)}
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
