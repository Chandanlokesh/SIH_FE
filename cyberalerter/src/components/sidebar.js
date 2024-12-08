import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "../images/dashboard.svg";
import Scanner from "../images/iscanner.svg";
import user from "../images/user-blue.svg";
import chatbot from "../images/chatbot-icon.svg"
import logo from "../images/logo/logo_over_black.svg";
import Logout from "../images/Logout.svg";
import { postAPI } from "../helpers/apiRequests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    postAPI({
      endpoint: "/Users/logout",
      params: {
        token: Cookies.get("token"),
      },
      callback: (response) => {
        if (response.status === 200) {
          localStorage.removeItem("userData");
          Cookies.remove("token");
          Cookies.remove("userId");
          navigate("/");
        } else {
          console.error(response.data.message);
        }
      },
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        isHovered ? "w-40 shadow-lg" : "w-16"
      } bg-gray-900 text-white z-50 transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col justify-between h-full pt-6">
        {/* Logo */}
        <div className="text-3xl px-4 font-bold tracking-wider">
          <img src={logo} alt="Dashboard Icon" className="w-12 h-12" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-8 mt-20">
          <Link
            to="/dashboard"
            className={`text-md py-2 px-3 rounded mx-2 w-auto ${
              isActive("/dashboard") && !isHovered
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            } transition duration-300 flex items-center`}
          >
            <img src={Dashboard} alt="Dashboard Icon" className="w-6 h-6" />
            {isHovered && <span className="ml-2">Dashboard</span>}
          </Link>
          <Link
            to="/scan"
            className={`text-md py-2 px-3 rounded mx-2 w-auto ${
              isActive("/scan") && !isHovered
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            } transition duration-300 flex items-center`}
          >
            <img src={Scanner} alt="Scanner Icon" className="w-6 h-6" />
            {isHovered && <span className="ml-2">Scanner</span>}
          </Link>
          <Link
            to="/chatbot"
            className={`text-md py-2 px-3 rounded mx-2 w-auto ${
              isActive("/chatbot") && !isHovered
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            } transition duration-300 flex items-center`}
          >
            <img src={chatbot} alt="Chatbot Icon" className="w-6 h-6" />
            {isHovered && <span className="ml-2">Chatbot</span>}
          </Link>
        </div>

        {/* User and Logout Row */}
        <div className="flex items-center justify-between mt-auto px-2 pb-4">
          {/* User Icon */}
          <Link
            to="/user"
          >
            <img
              src={user}
              alt="User Icon"
             className="text-white p-2 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Logout Icon */}
          {isHovered && (
            <button
              type="button"
              onClick={logout}
              className="text-white bg-blue-800 p-2 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110"
            >
              <img src={Logout} alt="Logout Icon" className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
