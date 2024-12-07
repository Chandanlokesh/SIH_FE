import React, { useState } from 'react';// Adjust the path to your icon
import searchIcon from '../../images/search.svg';
const QuickScanHistoryComponent = ({ qucikScanData = [] }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredProducts = qucikScanData.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) 
  );
  return  (
    <div className='max-h-[90vh]'>
      <div className="bg-white shadow-md rounded-lg p-2 ">
      <div className="flex items-center justify-between mb-2 pb-2 border-b-2 ">
    <h4 className="font-bold text-lg">Quick Scan History</h4>
    <div className="flex items-center w-[40%]">
      <img src={searchIcon} alt="Search Icon" className="w-6 h-6 mr-2" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-1 border rounded-md flex-1"
        placeholder="Search..."
      />
    </div>
  </div>
  
        {/* Scan List */}
        <div className='max-h-[70vh] overflow-auto'>
        {filteredProducts && filteredProducts.length > 0 ? (
filteredProducts.map((scan, index) => {
  // Count severities
  const severityCounts = scan.results.reduce(
    (acc, result) => {
      acc[result.baseSeverity] = (acc[result.baseSeverity] || 0) + 1;
      return acc;
    },
    { Critical: 0, High: 0, Medium: 0, Low: 0 }
  );

  return (
    <div key={index} id={`scan-${index}`}>
      {/* Collapsible Bar */}
      <div
        className={`flex justify-between items-center p-2 border-b-2 border-b-[#91D5FF] cursor-pointer hover:bg-[#E6F7FF]  ${
          expandedIndex === index && "bg-[#E6F7FF]"
        }`}
        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
      >
        <span className="font-semibold">{scan.productName}</span>
        <div className="flex items-center space-x-12">
          {/* Severity Dots */}
          <div className="flex items-center space-x-2 justify-start">
  {severityCounts.Critical > 0 && (
    <div className="flex items-center space-x-1" title={`Critical: ${severityCounts.Critical}`}>
      <div className="w-2 h-2 rounded-full bg-[#E10600]"></div>
      <span className="text-xs text-[#E10600] font-semibold">{severityCounts.Critical}</span>
    </div>
  )}
  {severityCounts.High > 0 && (
    <div className="flex items-center space-x-1" title={`High: ${severityCounts.High}`}>
      <div className="w-2 h-2 rounded-full bg-[#FE5000]"></div>
      <span className="text-xs text-[#FE5000] font-semibold">{severityCounts.High}</span>
    </div>
  )}
  {severityCounts.Medium > 0 && (
    <div className="flex items-center space-x-1" title={`Medium: ${severityCounts.Medium}`}>
      <div className="w-2 h-2 rounded-full bg-[#FFE900]"></div>
      <span className="text-xs text-[#FFE900] font-semibold">{severityCounts.Medium}</span>
    </div>
  )}
  {severityCounts.Low > 0 && (
    <div className="flex items-center space-x-1" title={`Low: ${severityCounts.Low}`}>
      <div className="w-2 h-2 rounded-full bg-[#DAF2C9]"></div>
      <span className="text-xs text-[#3B873E] font-semibold">{severityCounts.Low}</span>
    </div>
  )}
</div>

          <span>{new Date(scan.scanDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Expanded Details */}
      {expandedIndex === index && (
        <div className="mt-2 p-2 rounded-md">
          {scan.results.map((result, resIndex) => {
            let severityColor, severityText, severityBorder;
            switch (result.baseSeverity) {
              case "Critical":
                severityColor = "bg-[#E10600]";
                severityText = "text-white";
                severityBorder = "border-red-700";
                break;
              case "High":
                severityColor = "bg-[#FE5000]";
                severityText = "text-white";
                severityBorder = "border-orange-700";
                break;
              case "Medium":
                severityColor = "bg-[#FFE900]";
                severityText = "text-black";
                severityBorder = "border-yellow-500";
                break;
              case "Low":
                severityColor = "bg-[#DAF2C9]";
                severityText = "text-black";
                severityBorder = "border-green-700";
                break;
              default:
                severityColor = "bg-[#F2BDC2]";
                severityText = "text-black";
                severityBorder = "border-pink-700";
            }

            return (
              <div
                key={resIndex}
                className={`mb-4 pb-2 rounded-md border ${severityBorder}`}
              >
                <div
                  className={`font-bold ${severityColor} ${severityText} pt-2 px-2 rounded-t-md`}
                >
                  CVE ID: {result.cve_id}
                </div>
                <div className="mt-2 px-2 pb-2">
                  <p>
                    <b>Description:</b> {result.vulnerabilityDescription}
                  </p>
                  <p>
                    <b>Published Date:</b>{" "}
                    {result.published_date
                      ? new Date(result.publishedDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <b>Last Modified:</b>{" "}
                    {result.last_modified
                      ? new Date(result.lastModified).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <b>Base Score:</b> {result.baseScore}
                  </p>
                  <p>
                    <b>Severity:</b> {result.baseSeverity}
                  </p>
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
})
  ) : (
    <p className="text-gray-600">No scan data available.</p>
  )}
  
  
        </div>
      </div>
    </div>
  )
};

export default QuickScanHistoryComponent;
