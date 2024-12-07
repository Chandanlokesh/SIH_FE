import React, { useEffect, useState } from "react";
import { Upgrade } from "../helpers/apiRequests";
import BarChart from "../helpers/Barchart";

const PreviewComponent = ({ qucikScanData }) => {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [severityCountx, setSeverityCount] = useState({
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (qucikScanData && qucikScanData.severityCount) {
      setSeverityCount(qucikScanData?.severityCount);
    }
  }, [qucikScanData]);

  useEffect(() => {
    let user = localStorage.getItem("userData") ?? null;
    if (user) setUserData(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (userData) {
      setShowSubscribe(userData?.subscriptionPlan === "Free");
    }
  }, [userData]);

  return (
    <div className="grid grid-cols-3 gap-6 h-[300px] overflow-hidden pb-2">
      {/* First Division (Bar Chart Card) */}
      <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-[290px]">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Total Vulnerabilities</h3>
        <div className="h-[200px]">
          <BarChart data={severityCountx} />
        </div>
      </div>

      {/* Second Division (2x2 Cards) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Quick Scans */}
        <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg p-4 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-blue-600 mb-2">Quick Scans</h3>
          <div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">{qucikScanData?.scansToday || 0}</div>
            <p className="text-sm text-gray-500">Today</p>
            <div className="text-md font-semibold text-gray-700 mt-2">
              Scans Left: {qucikScanData?.scansLeftToday || 0}
            </div>
          </div>
        </div>

        {/* Card 2: Monitor Scans */}
        <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg p-4 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-green-600 mb-2">Monitor Scans</h3>
          <div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">0</div>
            <p className="text-sm text-gray-500">Today</p>
            <div className="text-md font-semibold text-gray-700 mt-2">Scans Left: 20</div>
          </div>
        </div>

        {/* Card 3: Placeholder for Timestamp */}
        <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg p-4 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-purple-600 mb-2">Last Scan Timestamp</h3>
          <div className="text-2xl font-bold text-gray-900 mt-4">
            {qucikScanData?.lastScanTimestamp || "N/A"}
          </div>
        </div>

        {/* Card 4: Subscription Plan */}
        <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg p-4 flex flex-col justify-between">
  <h3 className="text-lg font-bold text-red-600 mb-2">Subscription Plan</h3>
  {showSubscribe ? (
    <div className="flex flex-row items-center space-x-2">
      {/* Free User Label */}
      <div className="text-xl font-bold text-gray-900">Free User</div>
      
      {/* Get Pro Button */}
      <button
        onClick={() => Upgrade(setUserData)} // Pass setUserData here
        className="upgrade-button-db"
      >
        Get Pro
      </button>
    </div>
  ) : (
    <div className="pro">Pro User</div>
  )}
</div>

      </div>
    </div>
  );
};

export default PreviewComponent;
