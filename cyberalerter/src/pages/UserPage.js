import { useEffect, useState } from "react";
import { Upgrade } from "../helpers/apiRequests";
import Sidebar from "../components/sidebar";

const UserPage = () => {
  const storedData = localStorage.getItem("userData");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, [storedData]);

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
      : "";
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 flex justify-center items-center page-bg">
        {userData ? (
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 flex">
            {/* Left Division */}
            <div className="w-1/3 flex flex-col items-center space-y-6">
              {/* User Avatar */}
              <div className="flex justify-center items-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold shadow-md">
                {getInitials(userData.username)}
              </div>

              {/* Username */}
              <h2 className="text-xl font-bold text-gray-800">{userData.username}</h2>

              {/* Subscription Status */}
              {userData.subscriptionPlan === "Pro" ? (
                <div className="pro">
                  Pro User
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="free-user">
                    Free User
                  </div>
                  <button
                    onClick={() => Upgrade(setUserData)}  // Pass setUserData here
                    className="upgrade-button"
                  >
                    Upgrade to Pro Now
                  </button>
                </div>
              )}
            </div>

            {/* Right Division */}
            <div className="w-2/3 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">User Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Email:</span>
                  <span className="text-gray-800">{userData.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Quick Scan Limit:</span>
                  <span className="text-gray-800">{userData.scanLimit.quickScan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">
                    Quick Scans Performed Today:
                  </span>
                  <span className="text-gray-800">{userData.scansPerformedToday.quickScan}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
