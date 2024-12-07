import React, { useState } from 'react';

const MonitorScanHistoryComponent = ({ MonitorScanData = [] }) => {
  return (
        <div>
          {/* <div>
            <ul className="flex space-x-4">
              {MonitorScanData.map((scan, index) => (
                <li
                  key={index}
                  className={`cursor-pointer shadow-md border-2 p-1 rounded-lg ${
                    selectedScan === scan ? "bg-blue-800 text-white border-blue-600" : "bg-white"
                  }`}
                  onClick={() => setSelectedScan(scan)}
                >
                  {scan.productName}
                </li>
              ))}
            </ul>
          </div> */}


          {/* {selectedScan && (
            <div className="mt-4">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h4><b>Selected Scan:</b> {selectedScan.productName}</h4>
                <p><b>Details about:</b> {selectedScan.details}.</p>
              </div>
            </div>
          )} */}
        </div>
      )
};

export default MonitorScanHistoryComponent;
