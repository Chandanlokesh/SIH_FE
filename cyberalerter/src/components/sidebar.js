import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for route checking
import Dashboard from "../images/dashboard.svg";
import Scanner from "../images/iscanner.svg";
import Report from "../images/report.svg";
import user from "../images/user-blue.svg";
import logo from "../images/logo.svg";
import Logout from "../images/Logout.svg";
import { postAPI } from "../helpers/apiRequests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // Get the current location (URL)
  const navigate = useNavigate();

  // // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;
  const logout = () => {
    postAPI({
      endpoint: "/Users/logout",
      params: {
        token: Cookies.get("token"),
      },
      callback: (response) => {
        if (response.status === 200) {
          // Handle success, e.g., display a success messa
          localStorage.removeItem("userData");
          Cookies.remove("token");
          Cookies.remove("userId");
          navigate("/");
        } else {
          // Handle error response
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
        {/* Logo at the top */}
        <div className="text-3xl px-4 font-bold tracking-wider">
          <img src={logo} alt="Dashboard Icon" className="w-7 h-7" />{" "}
        </div>

        {/* Navigation links */}
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
        </div>
        <div className="flex items-center mt-auto mb-2"> 
            <Link to="/user" 
          className={`text-lg py-1 px-3 mx-1 rounded w-auto mt-auto mb-5 ${ 
            isActive("/user") ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white" 
            } 
            transition duration-300 flex items-center`} > 
        <img src={user} alt="Scanner Icon" className="w-6 h-6" />
        {isHovered && <span className="ml-2">Profile</span>}
         </Link> 
        <button type="button" 
        onClick={logout} onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
         className="text-white py-6 px-2 rounded-md flex items-center mr-4" > 
         <img src={Logout} alt="Logout Icon" className="w-6 h-6" />
          </button> 
         </div>
      </div>
    </div>
  );
};
export default Sidebar;
