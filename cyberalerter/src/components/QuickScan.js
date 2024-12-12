// import React, { useState } from "react";
// import { postAPI } from "../helpers/apiRequests";
// import Cookies from 'js-cookie';

// import startImg from "../images/scan_page/start-a-scrape.png";
// import loadingGif from "../images/scan_page/scrape-progress.gif";
// import errorImg from "../images/scan_page/image.png";

// const QuickScan = () => {
//   // State variables for form inputs
//   const [productName, setProductName] = useState("apache");
//   const [productVersion, setProductVersion] = useState("2.4.41");
//    const [year, setyear] = useState();
//   const [jsonData, setJsonData] = useState(null); // State to store the JSON data
//   const [error, setError] = useState("");
//   const [scanId, setScanId] = useState("");
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [scanStatus, setScanStatus] = useState("idle");
//   const toggleCollapse = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   const getSeverityColor = (severity) => {
//     switch (severity?.toLowerCase()) {
//       case "critical":
//         return "bg-red-500 text-white";
//       case "high":
//         return "bg-orange-500 text-white";
//       case "medium":
//         return "bg-yellow-500 text-white";
//       case "low":
//         return "bg-green-500 text-white";
//       default:
//         return "bg-gray-300 text-black";
//     }
//   };

//   const sendScan = () => {
//     if (!productName) {
//       setError("Product Name is required");
//       return;
//     }
//     setJsonData(null);
//     setScanStatus("loading");
//     setError("");
//     postAPI({
//       endpoint: "/quickscan/scan",
//       params: {
//         userId: Cookies.get('userId'),
//         productName: productName,
//         productVersion: productVersion ?? null,
//         year:year ? Number(year)  : null,
//       },
//       callback: (response) => {
//         console.log("[rs] response.status" , response.status , response.data.message)
//         if (response.status === 200) {
//           setJsonData(response.data.scanResults);
//           setScanId(response.data.scanId);
//           setScanStatus("idle");
//           console.log("inside [rs]")
//         } else {
//           console.log("[rs] inside error")
//           // Handle error response
//           setScanStatus("failed");
//         }
//       },
//     });
//   };

//   const sendEmail = () => {
//     postAPI({
//       endpoint: "/quickscan/send-email",
//       params: {
//         userId: Cookies.get('userId'),
//         scanId: scanId
//       },
//       callback: (response) => {
//         if (response.status === 200) {
//           alert('Email sent successfully');
//         } else {
//           setError(response.data.message);
//         }
//       },
//     });
//   };

//   return (
// <div className="mt-2 flex space-x-4 h-full">
//   {/* Left side - Form */}
//   <div className="flex flex-col w-[400px]">
//     <form className="space-y-4 flex flex-col">
//       <div>
//         <label className="block text-sm font-semibold mb-2">
//           Product Name <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="w-full p-2 border rounded-md"
//           placeholder="Enter Product Name"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold mb-2">
//           Product Version (optional)
//         </label>
//         <input
//           type="text"
//           value={productVersion}
//           onChange={(e) => setProductVersion(e.target.value)}
//           className="w-full p-2 border rounded-md"
//           placeholder="Enter Product Version"
//         />
//       </div>
//          <div>
//         <label className="block text-sm font-semibold mb-2">
//          Year (optional)
//         </label>
//         <select
//           type=""
//           value={year}
//           onChange={(e) => setyear(e.target.value)}
//           style={{color: 'black', border: '1px solid #ccc', padding: '8px' ,width: '150px'}}
//         >
//           <option >select</option>
//           <option value={2023}>2024-2023</option>
//           <option value={2022}>2023-2022</option>
//            <option value={2021}>2022-2021</option>
//           <option value={2020}>2021-2020</option>
//             <option>All</option>
//         </select>
//       </div>
//     </form>
//     <div className="mt-4 flex self-end space-x-2">
//     <button
//         type="button"
//         className="border-blue-500 border text-blue-500 py-2 px-6 rounded-lg "
//         onClick={()=>{
//           setProductVersion("");
//           setProductName("");
//         }}
//       >
//         Clear
//       </button>
//       <button
//         type="button"
//         className="bg-blue-500 text-white py-2 px-6 rounded-lg "
//         onClick={sendScan}
//       >
//         Scan
//       </button>
//     </div>
//     {error && <p className="text-red-500 mt-2">{error}</p>}
//   </div>

//   {/* Right side - JSON Data Display */}
//   <div className={`flex-1  border-l-[4px]`}>
         
//     {jsonData && !error ? (
//       <div className="flex flex-col ml-2 h-full">
//   <div className="flex justify-between items-center mb-2">
//     {/* Scan Details */}
//     <h2 className="text-lg font-semibold">Scan Details</h2>

//     {/* Send Email Button */}
//     <button
//       className="p-1 border-2 border-blue-800 hover:bg-blue-200 text-blue-800 text-md"
//       onClick={sendEmail}
//     >
//       Send Email
//     </button>
//   </div>

//   <div className="bg-white p-4 rounded-md overflow-y-auto">
//  {jsonData.map((result, index) => 
//  {          
//   let severityColor, severityText, severityBorder;
//     switch (result.baseSeverity.toLowerCase()) {
//       case 'critical':
//         severityColor = 'bg-red-100'; severityText='text-red-700'; severityBorder='border-red-500';
//         break;
//       case 'high':
//         severityColor = 'bg-orange-100'; severityText='text-orange-700'; severityBorder='border-orange-500';
//         break;
//       case 'medium':
//         severityColor = 'bg-yellow-100'; severityText='text-yellow-700'; severityBorder='border-yellow-500';
//         break;
//       case 'low':
//         severityColor = 'bg-green-100'; severityText='text-green-700'; severityBorder='border-green-500';
//         break;
//       default:
//         severityColor = 'bg-[#8AE0FF]'; severityText='text-[#3786A2]'; severityBorder='border-[3786A2]';

//     }
  
//  return (
//         <div key={index} className={`mb-2 border rounded-md ${severityBorder}`}>

//           <div
//             className={`p-1 cursor-pointer ${severityColor} ${severityText} rounded-t-md`}
//             onClick={() => toggleCollapse(index)}
//           >
//             {result.cve_id && <p><b>CVE ID:</b> {result.cve_id}</p>}
//           </div>

//           {/* Collapsible Content */}
//           {expandedIndex === index && (
//             <div className="p-1 border-1-px">
//               {result.cve_id &&<p><b>CVE ID:</b> {result.cve_id}</p>}
//               {result.vulnerabilityDescription  && <p><b>Description:</b> {result.vulnerabilityDescription}</p>}
//               {result.published_date && <p><b>Published Date:</b> {result.published_date}</p>}
//               {result.last_modified  && <p><b>Last Modified:</b> {result.last_modified}</p>}
//               {result.baseScore && <p><b>Base Score:</b> {result.baseScore}</p>}
//              { result.baseSeverity && <p><b>Severity:</b> {result.baseSeverity}</p> }
//               <p>
//                 <b>OEM URL:</b>{" "}
//                 <a
//                   href={result.oemUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   Details
//                 </a>
//               </p>
//             </div>
//           )}

//         </div>
//       )
//     }
//       )}
//   </div>
// </div>
//     ):
//     <div className="items-center justify-center flex flex-col h-full">
//     {scanStatus === "loading" && (
//       <>
//         <img src={loadingGif} alt="Loading..." className="w-200" />
//       </>
//     )}
  
//     {scanStatus === "failed" && (
//       <div className="text-center">
//         <img src={errorImg} alt="Error" className="h-64 w-64" />
//         <p className="mt-4 text-lg font-semibold text-gray-800">
//           Can't find any vulnerabilities.
//         </p>
//       </div>
//     )}
  
//     {scanStatus === "idle" && (
//       <img src={startImg} alt="Start Scan" className="h-64 w-64" />
//     )}
//   </div>
  
//        }
//   </div>
// </div>

//   );
// };

// export default QuickScan;


import React, { useState, useMemo } from "react";
import { postAPI } from "../helpers/apiRequests";
import Cookies from 'js-cookie';

import startImg from "../images/scan_page/start-a-scrape.png";
import loadingGif from "../images/scan_page/scrape-progress.gif";
import errorImg from "../images/scan_page/image.png";

const QuickScan = () => {
  // State variables for form inputs
  const [productName, setProductName] = useState("apache");
  const [productVersion, setProductVersion] = useState("2.4.41");
  const [year, setYear] = useState("");
  const [jsonData, setJsonData] = useState(null); // State to store the JSON data
  const [error, setError] = useState("");
  const [scanId, setScanId] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [scanStatus, setScanStatus] = useState("idle");

  const toggleCollapse = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Function to filter JSON data based on selected year
  const filteredJsonData = useMemo(() => {
    if (!jsonData) return null;

    // If no year selected or 'All' is selected, return all data
    if (!year || year === "") {
      return jsonData;
    }

    // Convert year to number for comparison
    const selectedYear = Number(year);

    // Filter logic based on selected year
    return jsonData.filter(result => {
      if (!result.published_date) return false;

      const pubYear = new Date(result.published_date).getFullYear();

      switch (selectedYear) {
        case 2023: 
          return [2023, 2024].includes(pubYear);
        case 2022:
          return [2022].includes(pubYear);
        case 2021:
          return [2021].includes(pubYear);
        case 2020:
          return [2020].includes(pubYear);
        default:
          return true;
      }
    });
  }, [jsonData, year]);

  const sendScan = () => {
    if (!productName) {
      setError("Product Name is required");
      return;
    }
    setJsonData(null);
    setScanStatus("loading");
    setError("");
    postAPI({
      endpoint: "/quickscan/scan",
      params: {
        userId: Cookies.get('userId'),
        productName: productName,
        productVersion: productVersion ?? null,
        year: year ? Number(year) : null,
      },
      callback: (response) => {
        if (response.status === 200) {
          setJsonData(response.data.scanResults);
          setScanId(response.data.scanId);
          setScanStatus("idle");
        } else {
          setScanStatus("failed");
        }
      },
    });
  };

  const sendEmail = () => {
    postAPI({
      endpoint: "/quickscan/send-email",
      params: {
        userId: Cookies.get('userId'),
        scanId: scanId
      },
      callback: (response) => {
        if (response.status === 200) {
          alert('Email sent successfully');
        } else {
          setError(response.data.message);
        }
      },
    });
  };

  const getSeverityColorClasses = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' };
      case 'high':
        return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' };
      case 'medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' };
      case 'low':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' };
      default:
        return { bg: 'bg-[#8AE0FF]', text: 'text-[#3786A2]', border: 'border-[#3786A2]' };
    }
  };

  return (
    <div className="mt-2 flex space-x-4 h-full">
      {/* Left side - Form */}
      <div className="flex flex-col w-[400px]">
        <form className="space-y-4 flex flex-col">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Product Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Product Version (optional)
            </label>
            <input
              type="text"
              value={productVersion}
              onChange={(e) => setProductVersion(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Product Version"
            />
          </div>
          <div className="mt-4 flex self-end space-x-2">
            <button
              type="button"
              className="border-blue-500 border text-blue-500 py-2 px-6 rounded-lg "
              onClick={() => {
                setProductVersion("");
                setProductName("");
                setYear("");
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg "
              onClick={sendScan}
            >
              Scan
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Right side - JSON Data Display */}
      <div className="flex-1 border-l-[4px]">
        {filteredJsonData && !error ? (
          <div className="flex flex-col ml-2 h-full">
            <div className="flex justify-between items-center mb-2">
              {/* Scan Details */}
              <h2 className="text-lg font-semibold">Scan Details</h2>

              {/* Year Dropdown */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-2 border rounded-md mr-2"
              >
                <option value="">All Years</option>
                <option value="2023">2024-2023</option>
                <option value="2022">2023-2022</option>
                <option value="2021">2022-2021</option>
                <option value="2020">2021-2020</option>
              </select>

              {/* Send Email Button */}
              <button
                className="p-2 border-2 border-blue-800 hover:bg-blue-200 text-blue-800 text-md rounded-md"
                onClick={sendEmail}
              >
                Send Email
              </button>
            </div>

            <div className="bg-white p-4 rounded-md overflow-y-auto">
              {filteredJsonData.map((result, index) => {
                const severityClasses = getSeverityColorClasses(result.baseSeverity);
                
                return (
                  <div key={index} className={`mb-2 border rounded-md ${severityClasses.border}`}>
                    <div
                      className={`p-1 cursor-pointer ${severityClasses.bg} ${severityClasses.text} rounded-t-md`}
                      onClick={() => toggleCollapse(index)}
                    >
                      {result.cve_id && <p><b>CVE ID:</b> {result.cve_id}</p>}
                    </div>

                    {expandedIndex === index && (
                      <div className="p-1 border-1-px">
                        {result.cve_id && <p><b>CVE ID:</b> {result.cve_id}</p>}
                        {result.vulnerabilityDescription && <p><b>Description:</b> {result.vulnerabilityDescription}</p>}
                        {result.published_date && <p><b>Published Date:</b> {result.published_date}</p>}
                        {result.last_modified && <p><b>Last Modified:</b> {result.last_modified}</p>}
                        {result.baseScore && <p><b>Base Score:</b> {result.baseScore}</p>}
                        {result.baseSeverity && <p><b>Severity:</b> {result.baseSeverity}</p>}
                        <p>
                          <b>OEM URL:</b>{" "}
                          <a
                            href={result.oemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Details
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="items-center justify-center flex flex-col h-full">
            {scanStatus === "loading" && (
              <img src={loadingGif} alt="Loading..." className="w-200" />
            )}
            
            {scanStatus === "failed" && (
              <div className="text-center">
                <img src={errorImg} alt="Error" className="h-64 w-64" />
                <p className="mt-4 text-lg font-semibold text-gray-800">
                  Can't find any vulnerabilities.
                </p>
              </div>
            )}
            
            {scanStatus === "idle" && (
              <img src={startImg} alt="Start Scan" className="h-64 w-64" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickScan;