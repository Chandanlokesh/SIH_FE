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
    getQuickScanHistory();
    getProductsMonitored();
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

  const getProductsMonitored = () =>{
    getAPI({
      endpoint: "/monitorscan/products/"+Cookies.get('userId'),
      callback: (response) => {
        if (response.status === 200) {
          localStorage.setItem("userProducts", JSON.stringify(response.data.products));
             
        } else {
          alert(response.data.message || "Failed to add product.");
        }
      },
    });
  }

  return (
    <div className="flex h-screen bg-gray-300">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 ml-16 flex flex-col ">
        {/* Header at the top */}
        <Header title="Dashboard" />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Preview Section */}
          <div className="mt-12">
            <PreviewComponent qucikScanData={qucikScanData.dashboard}  />
          </div>

          {/* History Section */}
          <div className="mt-3">
            <HistoryComponent  qucikScanData={qucikScanData.scansHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
