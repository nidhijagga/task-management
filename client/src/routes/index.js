import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import TaskList from "../components/TaskList";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import Private from "../components/PrivateRoute";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));

const LoadingFallback = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/private" element={<Private />}>
          <Route path="task-list" element={<TaskList />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="edit-task" >
            <Route path=":id" element={<EditTask/>}/>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
