import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-extrabold">
          Task Manager
        </Link>
        {token && token.length > 0 && (
          <button
          onClick={handleLogout}
          className="text-white hover:text-blue-950 bg-transparent border border-white rounded-md py-2 px-4 transition-opacity duration-300 hover:opacity-75"
        >
          Logout
        </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
