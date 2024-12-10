import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MonitorScan from "../components/MonitorScan";
import QuickScan from "../components/QuickScan";
import { getAPI } from "../helpers/apiRequests";
import Cookies from "js-cookie";
const ScanPage = () => {
  const [activeTab, setActiveTab] = useState("quickScan"); // State for active tab
  const [itList,setITList]=useState([]);
  const [otList,setOTList]=useState([]);
  const [existingProducts, setExistingProducts]=useState(null);
  const getIToem = () => {
    getAPI({
      endpoint: "/monitorscan/vendors/IT",
      callback: (response) => {
        if (response.status === 200) {
          console.log(" [rs] ", response.data);
           setITList(response.data.vendors);
        } else {
          console.error(response.data.message);
        }
      },
    });
  };

  const getOToem = () => {
    getAPI({
      endpoint: "/monitorscan/vendors/OT",
      callback: (response) => {
        if (response.status === 200) {
           setOTList(response.data.vendors);
        } else {
          console.error(response.data.message);
        }
      },
    });
  };


  const getProductsMonitored = ()=>{
    getAPI({
      endpoint: "/monitorscan/products/"+ Cookies.get("userId"),
      callback: (response) => {
        if (response.status === 200) {
          setExistingProducts(response.data.products);
        } else {
          console.error(response.data.message);
        }
      },
    });
  }

   console.log(" [rs] " , itList)
  useEffect(() => {
    getIToem();
    getOToem();
    getProductsMonitored();
  }, []);



  return (
    <div className="flex h-screen bg-cover bg-center bg-scan-patternn">
      {/* Sidebar on the left */}
      <Sidebar />
      {/* Main content on the right */}

  {/* Main Content */}
  <div className=" flex-row ml-24 mt-4 w-full">
      <div className="w-full pt-1 flex h-[100%]">
    <div className="p-2 overflow-auto form-abc w-[90%] ">
      {/* Card with Tabs */}
      <div className="flex justify-left">
        <button
          className={`flex py-1 px-1 text-center text-md font-semibold rounded-t-lg border-t-2 border-x-2 ${
            activeTab === "quickScan"
              ? "bg-white"
              : "bg-gray-300 text-gray-600 border-gray-300 shadow-inner"
          }`}
          onClick={() => setActiveTab("quickScan")}
        >
          Quick Scan
        </button>
        <button
          className={`flex py-1 px-1 text-center text-md font-semibold rounded-t-lg border-t-2 border-x-2 ${
            activeTab === "monitorScan"
              ? "bg-white"
              : "bg-gray-300 text-gray-600 border-gray-300 shadow-inner"
          }`}
          onClick={() => setActiveTab("monitorScan")}
        >
          Monitor Scan
        </button>
        <button className="h-[28px] w-[28px] rounded-2xl  border border-blue-400 text-blue-400 ml-2">
                 ?
        </button>
      </div>
      <div className="bg-gray-300 text-gray-600 border-gray-300 shadow-inner rounded-b-lg  rounded-tr-lg h-[90%]">
      <div className={`bg-white rounded-b-lg p-6 border-b-2 border-x-2 h-full ${activeTab === "monitorScan"? " rounded-t-xl ":" rounded-tr-lg "}`}>
        {/* Content based on active tab */}
        {activeTab === "quickScan" && <QuickScan />}
        {activeTab === "monitorScan" && <MonitorScan itList={itList} otList={otList} existingProducts={existingProducts} getProductsMonitored={getProductsMonitored}/>}
      </div>
      </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ScanPage;
