import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "../images/dashboard.svg";
import Scanner from "../images/iscanner.svg";
import user from "../images/user-blue.svg";
import chatbot from "../images/chatbot-icon.svg";
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
        isHovered ? "w-48 shadow-xl" : "w-16"
      } bg-[#09051A] text-white transition-all duration-300 z-[998]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col justify-between h-full relative">
        {/* Logo Section */}
        <div className="flex items-center justify-left py-4 ml-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 mt-10">
          <NavItem
            to="/dashboard"
            icon={Dashboard}
            label="Dashboard"
            isHovered={isHovered}
            isActive={isActive("/dashboard")}
          />
          <NavItem
            to="/scan"
            icon={Scanner}
            label="Scanner"
            isHovered={isHovered}
            isActive={isActive("/scan")}
          />
          <NavItem
            to="/chatbot"
            icon={chatbot}
            label="Chatbot"
            isHovered={isHovered}
            isActive={isActive("/chatbot")}
          />
        </div>

        {/* Logout Icon Fixed at Bottom-Right */}
        {isHovered && (
  <button
    onClick={logout}
    className="absolute bottom-4 right-4 p-2 rounded-full flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer opacity-0 hover:opacity-100 z-[999]"
    style={{
      opacity: isHovered ? 1 : 0,
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
    }}
  >
    <img src={Logout} alt="Logout Icon" className="w-6 h-6" />
  </button>
)}

        {/* User Icon */}
        <div className="mt-auto mb-4 flex items-center justify-start ml-3">
          <Link to="/user">
            <img
              src={user}
              alt="User Icon"
              className="w-10 h-10 rounded-full bg-black transform bg-black transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ to, icon, label, isHovered, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-3 mx-1 py-2 transition-all duration-300  rounded-md ${
        isActive
          ? "bg-blue-500 text-white"
          : "hover:bg-blue-600 hover:text-white"
      }`}
    >
      <img src={icon} alt={`${label} Icon`} className="w-6 h-6" />
      {isHovered && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

export default Sidebar;
