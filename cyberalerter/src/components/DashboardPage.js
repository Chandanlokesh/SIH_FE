import React, { useEffect, useState } from "react";
import { Upgrade } from "../helpers/apiRequests";
import BarChart from "./charts/Barchart";
import LineChart from "./charts/Linechart"; // Import LineChart
import DoughnutChart from "./charts/Doughnutchart"; // Import DoughnutChart

import notification from '../images/notification.png';
import quickScan from '../images/quickScan.png';
import monitorScan from '../images/monitorscan.png';

const PreviewComponent = ({ qucikScanData, lineChartData, doughnutChartData }) => {
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
    <div className="grid grid-rows-2 grid-cols-2 gap-2 h-[70vh] pb-4">
      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities in QuickScan</h3>
        <div className="h-[80%] w-full">
          <BarChart data={severityCountx} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-2">
  {/* Card 1: Quick Scans */}
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 grid grid-cols-2 items-center">
    {/* Left Column: Image */}
    <div className="ml-4">
      <div>
        <div className="text-3xl font-extrabold text-gray-900 mb-1">{qucikScanData?.scansToday || 0}</div>
        <p className="text-sm text-gray-500">Today</p>
      </div>
      <h3 className="text-lg font-bold mb-2">Quick Scans</h3>
    </div>
    {/* Right Column: Content */}
    <div className="flex items-end justify-center h-full">
      <img src={quickScan} alt="Quick Scans" className="h-24 w-24 object-contain" />
    </div>
  </div>

  {/* Card 2: Monitor Scans */}
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 grid grid-cols-2 items-center">
    {/* Left Column: Image */}
    <div className="ml-4">
      <div>
        <div className="text-3xl font-extrabold text-gray-900 mb-1">0</div>
        <p className="text-sm text-gray-500">Total</p>
      </div>
      <h3 className="text-lg font-bold mb-2">Monitor Scans</h3>
    </div>
    {/* Right Column: Content */}
    <div className="flex items-end justify-center h-full">
      <img src={monitorScan} alt="Monitor Scans" className="h-24 w-24 object-contain" />
    </div>
  </div>

  {/* Card 3: Notifications Sent */}
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 grid grid-cols-2 items-center">
    {/* Left Column: Image */}
    <div className="ml-4">
      <div className="text-2xl font-bold text-gray-900 mt-4">{qucikScanData?.notificationSent || 0}</div>
      <h3 className="text-lg font-bold mb-2">Notifications Sent</h3>
    </div>
    {/* Right Column: Content */}
    <div className="flex items-end justify-end">
      <img src={notification} alt="Notifications Sent" className="h-12 w-12 object-contain" />
    </div>
  </div>

  {/* Card 4: Subscription Plan (No Changes) */}
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 flex flex-col justify-between">
  <div className="ml-4">
    <h3 className="text-lg font-bold mb-2">Subscription Plan</h3>
    {showSubscribe ? (
      <div className="flex flex-row items-center space-x-2">
        <div className="text-xl font-bold text-gray-900">Free User</div>
        <button onClick={() => Upgrade(setUserData)} className="upgrade-button-db">
          Get Pro
        </button>
      </div>
      
    ) : (
      <div className="pro">Pro User</div>
    )}
  </div></div>
</div>


      {/* Line Chart */}
      <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities Over Time</h3>
        <div className="h-[80%]">
          <LineChart data={lineChartData} />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities by Product</h3>
        <div className="h-[80%]">
          <DoughnutChart data={doughnutChartData} />
        </div>
      </div>
    </div>
  );

  
};

export default PreviewComponent;
