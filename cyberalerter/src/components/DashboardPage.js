import React, { useEffect, useState } from "react";
import { Upgrade } from "../helpers/apiRequests";
import BarChart from "./charts/Barchart";
import LineChart from "./charts/Linechart"; // Import LineChart
import DoughnutChart from "./charts/Doughnutchart"; // Import DoughnutChart

import notification from '../images/notification.png';
import quickScan from '../images/quickScan.png';
import monitorScan from '../images/monitorscan.png';
import product from '../images/product.png';
import subs from '../images/Subs.png';
// const PreviewComponent = ({ qucikScanData, lineChartData, doughnutChartData }) => {
//   const [showSubscribe, setShowSubscribe] = useState(false);
//   const [severityCountx, setSeverityCount] = useState({
//     Low: 0,
//     Medium: 0,
//     High: 0,
//     Critical: 0,
//   });

//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (qucikScanData && qucikScanData.severityCount) {
//       setSeverityCount(qucikScanData?.severityCount);
//     }
//   }, [qucikScanData]);

//   useEffect(() => {
//     let user = localStorage.getItem("userData") ?? null;
//     if (user) setUserData(JSON.parse(user));
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       setShowSubscribe(userData?.subscriptionPlan === "Free");
//     }
//   }, [userData]);

//   return (
//     <div className="grid grid-rows-2 grid-cols-2 gap-2 h-[70vh] pb-4">
//       {/* Bar Chart */}
//       <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-full">
//         <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities in QuickScan</h3>
//         <div className="h-[80%] w-full">
//           <BarChart data={severityCountx} />
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-2 gap-2">
//   {/* Card 1: Quick Scans */}
//   <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 grid grid-cols-2 items-center">
//     {/* Left Column: Image */}
//     <div className="ml-4">
//       <div>
//         <div className="text-3xl font-extrabold text-gray-900 mb-1">{qucikScanData?.scansToday || 0}</div>
//         <p className="text-sm text-gray-500">Today</p>
//       </div>
//       <h3 className="text-lg font-bold mb-2">Quick Scans</h3>
//     </div>
//     {/* Right Column: Content */}
//     <div className="flex items-end justify-center h-full">
//       <img src={quickScan} alt="Quick Scans" className="h-24 w-24 object-contain" />
//     </div>
//   </div>

//   {/* Card 2: Monitor Scans */}
//   <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 grid grid-cols-2 items-center">
//     {/* Left Column: Image */}
//     <div className="ml-4">
//       <div>
//         <div className="text-3xl font-extrabold text-gray-900 mb-1">0</div>
//         <p className="text-sm text-gray-500">Total</p>
//       </div>
//       <h3 className="text-lg font-bold mb-2">Monitor Scans</h3>
//     </div>
//     {/* Right Column: Content */}
//     <div className="flex items-end justify-center h-full">
//       <img src={monitorScan} alt="Monitor Scans" className="h-24 w-24 object-contain" />
//     </div>
//   </div>

//   {/* Card 3: Notifications Sent */}
//   <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 grid grid-cols-2 items-center">
//     {/* Left Column: Image */}
//     <div className="ml-4">
//       <div className="text-2xl font-bold text-gray-900 mt-4">{qucikScanData?.notificationSent || 0}</div>
//       <h3 className="text-lg font-bold mb-2">Notifications Sent</h3>
//     </div>
//     {/* Right Column: Content */}
//     <div className="flex items-end justify-end">
//       <img src={notification} alt="Notifications Sent" className="h-12 w-12 object-contain" />
//     </div>
//   </div>

//   {/* Card 4: Subscription Plan (No Changes) */}
//   <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-4 flex flex-col justify-between">
//   <div className="ml-4">
//     <h3 className="text-lg font-bold mb-2">Subscription Plan</h3>
//     {showSubscribe ? (
//       <div className="flex flex-row items-center space-x-2">
//         <div className="text-xl font-bold text-gray-900">Free User</div>
//         <button onClick={() => Upgrade(setUserData)} className="upgrade-button-db">
//           Get Pro
//         </button>
//       </div>
      
//     ) : (
//       <div className="pro">Pro User</div>
//     )}
//   </div></div>
// </div>


//       {/* Line Chart */}
//       <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-full">
//         <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities Over Time</h3>
//         <div className="h-[80%]">
//           <LineChart data={lineChartData} />
//         </div>
//       </div>

//       {/* Doughnut Chart */}
//       <div className="bg-white shadow-md rounded-lg p-4 border-[1px] border-gray h-full">
//         <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities by Product</h3>
//         <div className="h-[80%]">
//           <DoughnutChart data={doughnutChartData} />
//         </div>
//       </div>
//     </div>
//   );

  
// };

// export default PreviewComponent;


const PreviewComponent = ({ qucikScanData, combinedData , notificationSent}) => {
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


  const prepareLineChartData = (data) => {
    const productDateCounts = {};
  
    // Iterate over each product
    data.forEach((item) => {
      const productName = item.productName;
      const scanDetails = item?.scanDetails?.scanDetails;
  
      if (scanDetails && scanDetails.publishedDates) {
        scanDetails.publishedDates.forEach((date) => {
          const formattedDate = new Date(date).toISOString().split('T')[0]; // format to YYYY-MM-DD
  
          // Initialize product entry if not already present
          if (!productDateCounts[productName]) {
            productDateCounts[productName] = {};
          }
  
          // Count the vulnerabilities for each product on a given date
          productDateCounts[productName][formattedDate] = 
            (productDateCounts[productName][formattedDate] || 0) + 1;
        });
      }
    });
  
    // Create datasets for the chart
    const productNames = Object.keys(productDateCounts);
    const allDates = [...new Set(productNames.flatMap(product => Object.keys(productDateCounts[product])))];
  
    // Create the data for the chart
    const datasets = productNames.map((productName) => {
      const dataForProduct = allDates.map((date) => {
        return productDateCounts[productName][date] || 0; // Use 0 if no vulnerabilities on that date for the product
      });
  
      return {
        label: productName, // Use product name as the label for each line
        data: dataForProduct,
        borderColor: getRandomColor(), // You can define a function to generate a color or pick a static one
        backgroundColor: 'rgba(25, 86, 194, 0.1)', // Optional background color for line area
        fill: true, // Fill the area under the line
        tension: 0.2, // Curved lines
      };
    });
  
    // Return the chart data object
    return {
      labels: allDates, // Use all dates as x-axis labels
      datasets: datasets, // Add the datasets for each product
    };
  };
  
  // Utility function to generate a random color for each product line
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Usage example:
  const lineChartData = combinedData ? prepareLineChartData(combinedData) : {};
  

  const prepareDoughnutChartData = (data) => {
    const productCounts = {};
  
    data.forEach((item) => {
      const productName = item?.productName;
      const vulnerabilities = item?.scanDetails?.scanDetails?.totalVulnerabilities;
      if (productName && vulnerabilities !== undefined) {
        productCounts[productName] = (productCounts[productName] || 0) + vulnerabilities;
      }
    });
  
    // Convert productCounts object to an array of objects for chart
    return Object.entries(productCounts).map(([product, count]) => ({
      product,
      count,
    }));
  };
  
  
  const doughnutChartData = combinedData? prepareDoughnutChartData(combinedData): [];
  


  return (
    <div className="grid grid-rows-auto gap-4  pb-4">
      {/* Row 1: Cards */}
 {/* Row 1: Smaller Cards */}
 <div className="grid grid-cols-5 gap-4">
   {/* Card 1: Quick Scans */}
   <div className="bg-white shadow-md rounded-lg py-2 px-3 flex justify-between items-end h-[100px] group hover:bg-blue-700 transition-colors duration-300">
    <div className="text-left">
      <p className="text-sm text-gray-500 group-hover:text-white">Today</p>
      <h3 className="text-xl font-bold group-hover:text-white">Quick <br /> Scans</h3>
    </div>
    <div className="text-[65px] text-gray-900 group-hover:text-white">{qucikScanData?.scansToday}</div>
  </div>

  {/* Card 2: Monitor Scans */}
  <div className="bg-white shadow-md rounded-lg py-2 px-3 flex justify-between items-end h-[100px] group hover:bg-blue-700 transition-colors duration-300">
    <div className="text-left">
      <span className="text-sm text-gray-500 group-hover:text-white">Total</span>
      <h3 className="text-xl font-bold group-hover:text-white">Monitor <br /> Scans</h3>
    </div>
    <div className="text-[65px] text-gray-900 group-hover:text-white">0</div>
  </div>

  {/* Card 3: Notifications Sent */}
  <div className="bg-white shadow-md rounded-lg py-2 px-3 flex justify-between items-end h-[100px] group hover:bg-blue-700 transition-colors duration-300">
    <div className="text-left">
      <h3 className="text-xl font-bold group-hover:text-white">Notifications <br /> Received</h3>
    </div>
    <div className="text-[65px] text-gray-900 group-hover:text-white">{notificationSent??0}</div>
  </div>

  {/* Card 4: Total Products Monitored */}
  <div className="bg-white shadow-md rounded-lg py-2 px-3 flex justify-between items-end h-[100px] group hover:bg-blue-700 transition-colors duration-300">
    <div className="text-left">
      <h3 className="text-xl font-bold group-hover:text-white">Total Products<br />Being Monitored</h3>
    </div>
    <div className="text-[65px] text-gray-900 group-hover:text-white">{combinedData?.length}</div>
  </div>

  {/* Card 5: Subscription Plan */}
  <div className="bg-white shadow-md rounded-lg py-2 px-3 flex justify-between items-end h-[100px] hover:bg-blue-700 hover:text-white transition-colors duration-300">
  <div className="flex flex-col justify-start text-left">
    
    <h3 className="text-xl font-bold mb-1 hover:text-white ">Subscription <br/> Plan</h3>
    {showSubscribe && (
      <button
        onClick={() => Upgrade(setUserData)}
        className="upgrade-button-db"
      >
        Upgrade to Pro
      </button>
     )} 
  </div>
  <div className="flex items-center">
    {showSubscribe ? (
      <div className="free-user">Free <br/> User</div>
     ) : (
      <div className="pro-db text-[20px]">Pro <br/> User</div>
    )} 
  </div>
</div>

</div>


      {/* Row 2: Charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-2 border-[1px] border-gray h-full">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities in QuickScan</h3>
          <div className="h-[80%] w-full">
         { severityCountx && <BarChart data={severityCountx} />}
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-2 border-[1px] border-gray h-full">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Vulnerabilities Over Time</h3>
          <div className="h-[80%]">
         {lineChartData &&    <LineChart lineChartData={lineChartData} />}
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-md rounded-lg p-2 border-[1px] border-gray h-full">
  <div className="flex justify-between items-center mb-2 ">
    <h3 className="text-xl font-bold text-gray-700">Vulnerabilities by Product</h3>
    <div className="text-lg font-semibold text-gray-900">Products</div>
  </div>
  <div className="h-[80%]">
   {doughnutChartData &&  <DoughnutChart doughnutChartData={doughnutChartData} /> }
  </div>
</div>
      </div>
    </div>
  );
};

export default PreviewComponent;


{/* <div className="grid grid-cols-5 gap-4">
  {/* Card 1: Quick Scans 
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-3 flex justify-between items-center h-[100px]">
    <div>
      <h3 className="text-sm font-bold mb-1">Quick Scans</h3>
      <div className="text-2xl font-extrabold text-gray-900">{qucikScanData?.scansToday || 0}</div>
      <p className="text-xs text-gray-500">Today</p>
    </div>
    <img src={quickScan} alt="Quick Scans" className="h-10 w-10 object-contain" />
  </div>

  {/* Card 2: Monitor Scans 
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-3 flex justify-between items-center h-[100px]">
    <div>
      <h3 className="text-sm font-bold mb-1">Monitor Scans</h3>
      <div className="text-2xl font-extrabold text-gray-900">0</div>
      <p className="text-xs text-gray-500">Total</p>
    </div>
    <img src={monitorScan} alt="Monitor Scans" className="h-10 w-10 object-contain" />
  </div>

  {/* Card 3: Notifications Sent 
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-3 flex justify-between items-center h-[100px]">
    <div>
      <h3 className="text-sm font-bold mb-1">Notifications Sent</h3>
      <div className="text-2xl font-extrabold text-gray-900">{qucikScanData?.notificationSent || 0}</div>
    </div>
    <img src={notification} alt="Notifications Sent" className="h-10 w-10 object-contain" />
  </div>

  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-3 flex justify-between items-center h-[100px]">
    <div>
      <h3 className="text-sm font-bold mb-1">Total products <br/> being monitored</h3>
      <div className="text-2xl font-extrabold text-gray-900">{qucikScanData?.notificationSent || 0}</div>
    </div>
    <img src={product} alt="Notifications Sent" className="h-10 w-10 object-contain" />
  </div>

  {/* Card 4: Subscription Plan 
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg py-2 px-3 flex justify-between items-center h-[100px]">
   <div className="flex-col">
    <h3 className="text-sm font-bold mb-1">Subscription Plan</h3>
     {showSubscribe ? ( 
      <div className="flex items-center space-x-2">
        <div className="text-sm font-bold text-gray-900">Free User</div>
        <button onClick={() => Upgrade(setUserData)} className="upgrade-button-db">
           Get Pro
         </button>
      </div>
      </div>
     ) : (
       <div className="pro">Pro User</div>
    )} 
       <img src={subs} alt="Notifications Sent" className="h-10 w-10 object-contain" />
  </div>
</div> */}