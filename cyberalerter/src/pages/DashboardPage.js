// DashboardPage.js
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import PreviewComponent from '../components/DashboardPage';
import HistoryComponent from '../components/history/History';
import { useEffect } from 'react';
import { getAPI } from '../helpers/apiRequests';
import Cookies from 'js-cookie';

const DashboardPage = () => {
  const [qucikScanData, setQucikScanData] = useState("")
  useEffect(()=>{
    getAPI({
      endpoint: "/users/user_profile",
      callback: (response) => {
        if (response.status === 200) {
            console.log("[a] ", response.data.data)
            localStorage.setItem("userData", JSON.stringify(response.data.data));
        } else {
          console.error(response.data.message);
        }
      },
    });
    getQuickScanHistory()
  },[])

  const getQuickScanHistory=()=>{
    getAPI({
    endpoint: "/quickscan/quickscan_dashboard",
    params:{ 
       userId: Cookies.get('userId')
    },
    callback: (response) => {
      if (response.status === 200) {
        setQucikScanData(response.data.data)
      } else {
        // Handle error response
        console.error(response.data.message);
      }
    },
  });
  }

  return (
    // <div className="flex h-screen bg-gradient-to-br from-[#E6F7FF] via-white to-[#E6F7FF]">
    <div className="flex h-screen bg-gradient-to-br from-[#E6F7FF] via-white to-[#E6F7FF]">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 ml-16 flex flex-col ">
        {/* Header at the top */}
        <Header title="Dashboard" />

        {/* Main Content */}
        <div className="flex-1 mt-10 p-6 overflow-auto">
          {/* Preview Section */}
          <div className="mt-8">
            <PreviewComponent qucikScanData={qucikScanData.dashboard}  />
          </div>

          {/* History Section */}
          <div className="mt-8">
            <HistoryComponent  qucikScanData={qucikScanData.scansHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
