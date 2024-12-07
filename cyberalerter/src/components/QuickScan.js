import React, { useState } from "react";
import { postAPI } from "../helpers/apiRequests";
import Cookies from 'js-cookie';

import startImg from "../images/scan_page/start-a-scrape.png";
import loadingGif from "../images/scan_page/scrape-progress.gif";
import errorImg from "../images/scan_page/image.png";

const QuickScan = () => {
  // State variables for form inputs
  const [productName, setProductName] = useState("apache");
  const [productVersion, setProductVersion] = useState("2.4.41");
  const [cveId, setCveId] = useState("CVE-2024-0001");
  const [jsonData, setJsonData] = useState(null); // State to store the JSON data
  const [error, setError] = useState("");
  const [scanId, setScanId] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [scanStatus, setScanStatus] = useState("idle");
  const toggleCollapse = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

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
        cveId: cveId ?? null
      },
      callback: (response) => {
        console.log("[rs] response.status" , response.status , response.data.message)
        if (response.status === 200) {
          setJsonData(response.data.scanResults);
          setScanId(response.data.scanId);
          setScanStatus("idle");
          console.log("inside [rs]")
        } else {
          console.log("[rs] inside error")
          // Handle error response
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
      <div>
        <label className="block text-sm font-semibold mb-2">
          CVE ID (optional)
        </label>
        <input
          type="text"
          value={cveId}
          onChange={(e) => setCveId(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter CVE ID"
        />
      </div>
    </form>
    <div className="mt-4 flex self-end space-x-2">
    <button
        type="button"
        className="border-blue-500 border text-blue-500 py-2 px-6 rounded-lg "
        onClick={()=>{
          setCveId("");
          setProductVersion("");
          setProductName("");
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
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>

  {/* Right side - JSON Data Display */}
  <div className={`flex-1  border-l-[4px]`}>
         
    {jsonData && !error ? (
      <div className="flex flex-col ml-2 h-full">
  <div className="flex justify-between items-center mb-2">
    {/* Scan Details */}
    <h2 className="text-lg font-semibold">Scan Details</h2>

    {/* Send Email Button */}
    <button
      className="p-1 border-2 border-blue-800 hover:bg-blue-200 text-blue-800 text-md"
      onClick={sendEmail}
    >
      Send Email
    </button>
  </div>

  <div className="bg-white p-4 rounded-md overflow-y-auto">
 {jsonData.map((result, index) => 
 {          
  let severityColor, severityText, severityBorder;
    switch (result.baseSeverity.toLowerCase()) {
      case 'critical':
        severityColor = 'bg-red-100'; severityText='text-red-700'; severityBorder='border-red-500';
        break;
      case 'high':
        severityColor = 'bg-orange-100'; severityText='text-orange-700'; severityBorder='border-orange-500';
        break;
      case 'medium':
        severityColor = 'bg-yellow-100'; severityText='text-yellow-700'; severityBorder='border-yellow-500';
        break;
      case 'low':
        severityColor = 'bg-green-100'; severityText='text-green-700'; severityBorder='border-green-500';
        break;
      default:
        severityColor = 'bg-pink-100'; severityText='text-pink-700'; severityBorder='border-pink-500';

    }
  
 return (
        <div key={index} className={`mb-2 border rounded-md ${severityBorder}`}>

          <div
            className={`p-1 cursor-pointer ${severityColor} ${severityText} rounded-t-md`}
            onClick={() => toggleCollapse(index)}
          >
            <p><b>CVE ID:</b> {result.cve_id}</p>
          </div>

          {/* Collapsible Content */}
          {expandedIndex === index && (
            <div className="p-1 border-1-px">
              <p><b>CVE ID:</b> {result.cve_id}</p>
              <p><b>Description:</b> {result.vulnerabilityDescription}</p>
              <p><b>Published Date:</b> {result.published_date}</p>
              <p><b>Last Modified:</b> {result.last_modified}</p>
              <p><b>Base Score:</b> {result.baseScore}</p>
              <p><b>Severity:</b> {result.baseSeverity}</p>
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
      )
    }
      )}
  </div>
</div>
    ):
    <div className="items-center justify-center flex h-full">
      {scanStatus === "loading" && <>
      <img src={loadingGif} alt="Loading..." className=" w-200" /></> }

         {scanStatus === "failed"  && <img src={errorImg} alt="Error" className="h-64 w-100" />}
         {scanStatus==="idle" && <img src={startImg} alt="Start Scan" className="h-64 w-64" />}
         
         
       </div>
       }
  </div>
</div>

  );
};

export default QuickScan;
