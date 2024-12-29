import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          PingPal
        </Link>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-100 hover:text-green-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-400 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
