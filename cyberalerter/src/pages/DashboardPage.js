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
  const [monitoredProducts,setMonitoredProducts]=useState([])
  const [combinedData, setCombinedData] = useState([]);
  const [notificationSent,setNotificationSent]=useState(0)
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
    getNotificationCount();
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

  const getNotificationCount=()=>{
    getAPI({
    endpoint: "/monitorscan/notification", //proper end point add madko 
    params:{ 
       userId: Cookies.get('userId')
    },
    callback: (response) => {
      if (response.status === 200) {
           // response format {notification : 6}
        //{}
        setNotificationSent(response.data.notification)
      } else {
        // Handle error response
        console.error(response.data.message);
      }
    },
  });
  }



  const getProductsMonitored = () => {
    getAPI({
      endpoint: "/monitorscan/products/" + Cookies.get("userId"),
      callback: async (response) => {
        if (response.status === 200) {
          const products = response.data.products;
          setMonitoredProducts(products);
          await fetchScanDetails(products);
        } else {
          console.error("Failed to fetch monitored products");
        }
      },
    });
  };

  const fetchScanDetails = async (products) => {
    try {
      const productDetailsPromises = products.map(
        (product) =>
          new Promise((resolve) => {
            getAPI({
              endpoint: `/monitorscan/scan_details/${product.productId}`,
              callback: (response) => resolve(response), // Provide a callback to resolve the promise
            });
          })
      );
  
      const scanDetailsResponses = await Promise.all(productDetailsPromises);
  
      const combined = products.map((product, index) => ({
        ...product,
        scanDetails: scanDetailsResponses[index]?.data || {},
      }));
  
      setCombinedData(combined);
      console.log("Combined Data:", combined);
    } catch (error) {
      console.error("Error fetching scan details:", error);
    }
  };
  


   //charts


  return (
    <div className="flex h-screen bg-[#F8f8f8]">
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
          {combinedData && qucikScanData &&   <PreviewComponent qucikScanData={qucikScanData.dashboard} combinedData={combinedData}  notificationSent={notificationSent} /> }
          </div>

          {/* History Section */}
          <div className="mt-3">
          {combinedData && qucikScanData &&   <HistoryComponent  qucikScanData={qucikScanData.scansHistory} monitorScanData={combinedData}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
