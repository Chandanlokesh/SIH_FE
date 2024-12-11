import React, { useState } from 'react';
import MonitorScanHistoryComponent from './monitorScanHistory';
import QuickScanHistoryComponent from './singleScanHistory';
const HistoryComponent = ({ qucikScanData = [] , monitorScanData=[]}) => {
  const [activeOption, setActiveOption] = useState('monitorScan'); // State for active option

  //   const element = document.getElementById(scanId);  // Get the specific div by scanId
    
  //   // Use html2pdf to convert the selected div to PDF
  //   html2pdf()
  //     .from(element)   // Element to convert to PDF
  //     .save(`${scanId}_scan_details.pdf`);  // Download the PDF with a name based on scanId
  // };

  // Filter products based on search query


  return (
    <div className="space-y-4">
     <div>
  <h3 
    id="history" 
    className="cursor-pointer text-2xl font-bold hover:text-blue-800" 
    onClick={() => window.scrollTo(0, 0)}
  >
    <a href={"#history"}>History</a>
  </h3>
</div>

      {/* Options for Monitor Scans and Other History */}
      <div className="flex space-x-4">
        <button
          className={`${
            activeOption === 'monitorScan' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600'
          }`}
          onClick={() => setActiveOption('monitorScan')}>
          <b>Monitor Scan History</b>
        </button>
        <button
          className={`${
            activeOption === 'otherHistory' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600'
          }`}
          onClick={() => setActiveOption('otherHistory')}
        >
          <b>Single Scan History</b>
        </button>
      </div>

      {/* Render content based on active option */}
      {activeOption === 'monitorScan' && <MonitorScanHistoryComponent combinedData={monitorScanData}/>}

      {/* Table for scan history */}
      {activeOption === 'otherHistory' && <QuickScanHistoryComponent qucikScanData={qucikScanData}/>}

    </div>
  );
};

export default HistoryComponent;
