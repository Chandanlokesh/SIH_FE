import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MonitorScan from "../components/MonitorScan";
import QuickScan from "../components/QuickScan";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("quickScan"); // State for active tab

  
  // const [inputCount, setInputCount] = useState(0);

  // const handleInputCountChange = (e) => {
  //   setInputCount(parseInt(e.target.value));
  // };

  // const renderInputs = () => {
  //   const inputs = [];
  //   for (let i = 1; i <= inputCount; i++) {
  //     inputs.push(
  //       <div key={i}>
  //         <label className="block text-sm font-semibold mb-2">Input {i}</label>
  //         <input
  //           type="text"
  //           className="w-full p-2 border rounded-md"
  //           placeholder={`Enter Input ${i}`}
  //         />
  //       </div>
  //     );
  //   }
  //   return inputs;
  // };

  return (
    <div className="flex h-screen bg-cover bg-center bg-black ">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content on the right */}
      <div className="flex-row ml-24 mt-4 w-full">
        <div className="w-full pt-1 flex h-[100%]">
          <div className="p-2 overflow-auto form-abc w-[90%]">
            {/* Card with Tabs */}
            <div className="flex justify-left">
              <button
                className={`flex py-1 px-1 text-center text-md font-semibold rounded-t-lg border-t-2 border-x-2 ${
                  activeTab === "quickScan"
                    ? "bg-[#171520] text-white"
                    : "bg-gray-800 text-gray-400 border-gray-600"
                }`}
                onClick={() => setActiveTab("quickScan")}
              >
                Quick Scan
              </button>
              <button
                className={`flex py-1 px-1 text-center text-md font-semibold rounded-t-lg border-t-2 border-x-2 ${
                  activeTab === "monitorScan"
                    ? "bg-[#171520] text-white"
                    : "bg-gray-800 text-gray-400 border-gray-600"
                }`}
                onClick={() => setActiveTab("monitorScan")}
              >
                Monitor Scan
              </button>
              <button className="h-[28px] w-[28px] rounded-2xl border border-blue-400 text-blue-400 ml-2">
                ?
              </button>
            </div>
  
            <div className="bg-gray-800 text-gray-300 border-gray-600 shadow-inner rounded-b-lg rounded-tr-lg h-[90%] border-l border-gray-600">
              <div
                className={`bg-[#171520] rounded-b-lg p-6 border-b-2 border-x-2 h-full ${
                  activeTab === "monitorScan" ? "rounded-t-xl" : "rounded-tr-lg"
                }`}
              >
                {/* Content based on active tab */}
                {activeTab === "quickScan" && <QuickScan />}
                {activeTab === "monitorScan" && <MonitorScan />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default DashboardPage;
