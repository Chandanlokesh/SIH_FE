import React, { useState } from 'react';
// Adjust the path to your icon
import searchIcon from '../../images/search.svg';

const QuickScanHistoryComponent = ({ qucikScanData = [] }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [expandedIndex, setExpandedIndex] = useState(0); // Default to first scan

  const filteredProducts = qucikScanData.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shadow-md rounded-lg h-[80vh] overflow-hidden bg-gradient-to-b from-[#50BBFF] via-[#40ACFB] to-[#0884DC]">
      {/* Header with Search Bar */}
      <div className="px-4 py-2 font-bold text-lg border-b border-gray-300 shadow-md flex items-center justify-between text-white">
        <h4>Quick Scans</h4>
        <div className="flex items-center w-[40%] ">
          <img src={searchIcon} alt="Search Icon" className="w-6 h-6 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 border rounded-md flex-1 bg-inherit text-white placeholder-gray-500"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex h-[72vh]">
        {/* Left Section: Product List */}
        <div className="w-1/4 overflow-y-auto">
          <ul>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((scan, index) => {
                const severityCounts = scan.results.reduce(
                  (acc, result) => {
                    acc[result.baseSeverity] = (acc[result.baseSeverity] || 0) + 1;
                    return acc;
                  },
                  { Critical: 0, High: 0, Medium: 0, Low: 0 }
                );

                return (
                  <li
                    key={index}
                    className={`cursor-pointer px-4 py-3 border-b border-gray-300 ${
                      expandedIndex === index
                        ? "bg-white text-black shadow-md font-semibold"
                        : "hover:bg-[#E0F7FA]"
                    }`}
                    onClick={() => setExpandedIndex(index)}
                  >
                    <div className="text-lg font-semibold">{scan.productName}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        {severityCounts.Critical > 0 && (
                          <div
                            className="flex items-center space-x-1"
                            title={`Critical: ${severityCounts.Critical}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-[#E10600]"></div>
                            <span className="text-xs text-[#E10600] font-semibold">
                              {severityCounts.Critical}
                            </span>
                          </div>
                        )}
                        {severityCounts.High > 0 && (
                          <div
                            className="flex items-center space-x-1"
                            title={`High: ${severityCounts.High}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-[#FE5000]"></div>
                            <span className="text-xs text-[#FE5000] font-semibold">
                              {severityCounts.High}
                            </span>
                          </div>
                        )}
                        {severityCounts.Medium > 0 && (
                          <div
                            className="flex items-center space-x-1"
                            title={`Medium: ${severityCounts.Medium}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-[#FFE900]"></div>
                            <span className="text-xs text-[#FFE900] font-semibold">
                              {severityCounts.Medium}
                            </span>
                          </div>
                        )}
                        {severityCounts.Low > 0 && (
                          <div
                            className="flex items-center space-x-1"
                            title={`Low: ${severityCounts.Low}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-[#DAF2C9]"></div>
                            <span className="text-xs text-[#3B873E] font-semibold">
                              {severityCounts.Low}
                            </span>
                          </div>
                        )}
                      </div>
                      <span>{new Date(scan.scanDate).toLocaleDateString()}</span>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-600 p-4">No scan data available.</p>
            )}
          </ul>
        </div>

        {/* Right Section: Details */}
        <div className="w-3/4 p-2 overflow-y-auto bg-white mr-2 mb-2 rounded-lg">
          {expandedIndex !== null && filteredProducts[expandedIndex] ? (
            <div>
              {filteredProducts[expandedIndex].results.map((result, resIndex) => {
                let severityColor, severityText, severityBorder;
                switch (result.baseSeverity) {
                  case 'Critical':
                    severityColor = 'bg-[#E10600]';
                    severityText = 'text-white';
                    severityBorder = 'border-red-700';
                    break;
                  case 'High':
                    severityColor = 'bg-[#FE5000]';
                    severityText = 'text-white';
                    severityBorder = 'border-orange-700';
                    break;
                  case 'Medium':
                    severityColor = 'bg-[#FFE900]';
                    severityText = 'text-black';
                    severityBorder = 'border-yellow-500';
                    break;
                  case 'Low':
                    severityColor = 'bg-[#DAF2C9]';
                    severityText = 'text-black';
                    severityBorder = 'border-green-700';
                    break;
                  default:
                    severityColor = 'bg-[#3786A2]';
                    severityText = 'text-white';
                    severityBorder = 'border-[#3786A2]';
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
                      {result.vulnerabilityDescription && (
                        <p>
                          <b>Description:</b> {result.vulnerabilityDescription}
                        </p>
                      )}
                      {result.published_date && (
                        <p>
                          <b>Published Date:</b> {result.published_date}
                        </p>
                      )}
                      {result.last_modified && (
                        <p>
                          <b>Last Modified:</b> {result.last_modified}
                        </p>
                      )}
                      {result.baseScore && (
                        <p>
                          <b>Base Score:</b> {result.baseScore}
                        </p>
                      )}
                      {result.baseSeverity && (
                        <p>
                          <b>Severity:</b> {result.baseSeverity}</p>
                      )}
                      {result.oemUrl && (
                        <p>
                          <b>OEM URL:</b>{' '}
                          <a
                            href={result.oemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Details
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">Select a product to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickScanHistoryComponent;
