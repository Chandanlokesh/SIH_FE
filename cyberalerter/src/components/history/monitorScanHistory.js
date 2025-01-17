// import React, { useState } from 'react';

// const MonitorScanHistoryComponent = ({ combinedData = []}) => {
//   const [openProductId, setOpenProductId] = useState(null); // Track which product is open

//   const toggleProductDetails = (productId) => {
//     if (openProductId === productId) {
//       setOpenProductId(null); // Close if the same product is clicked
//     } else {
//       setOpenProductId(productId); // Open the clicked product
//     }
//   };

//   // Define severity colors
//   const severityColors = {
//     Critical: {
//       background: 'bg-[#E10600]',
//       text: 'text-white',
//       border: 'border-red-700',
//     },
//     High: {
//       background: 'bg-[#FE5000]',
//       text: 'text-white',
//       border: 'border-orange-700',
//     },
//     Medium: {
//       background: 'bg-[#FFE900]',
//       text: 'text-black',
//       border: 'border-yellow-500',
//     },
//     Low: {
//       background: 'bg-[#DAF2C9]',
//       text: 'text-black',
//       border: 'border-green-700',
//     },
//     Default: {
//       background: 'bg-[#3786A2]',
//       text: 'text-white',
//       border: 'border-[#3786A2]',
//     }
//   };

//   const getSeverityStyles = (severity) => {
//     return severityColors[severity] || severityColors.Default; // Default if severity is not found
//   };

//   return (combinedData.length > 0 &&
//     (
// <div className="bg-white shadow-md rounded-lg p-2 max-h-[90vh] overflow-y-auto">
//       <table className="min-w-full table-auto border-collapse">
//       <thead className="sticky top-0 bg-white z-10">
//           <tr>
//             <th className="px-4 py-2 text-left">Product Name</th>
//             {/* <th className="px-4 py-2 text-left">Total Vulnerabilities</th>
//             <th className="px-4 py-2 text-left">Details</th> */}
//             <th className="px-4 py-2 text-left"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {combinedData.map((product) => (
//             <React.Fragment key={product._id}>
//               {/* Product Row */}
//               <tr
//                 className={`cursor-pointer ${openProductId === product.productId ? 'bg-[#E6F7FF]' : 'hover:bg-[#E6F7FF]'} border-b border-[#080808] `}
//                 onClick={() => toggleProductDetails(product.productId)}
//               >
//                 <td className="px-4 py-2">{product.productName}</td>
//                 {product?.scanDetails?.scanDetails?.totalVulnerabilities  &&<td className="px-4 py-2 text-right">{product.scanDetails.scanDetails.totalVulnerabilities}</td> }
//                 {/* <td className="px-4 py-2 text-blue-600">{openProductId === product.productId ? 'Hide Details' : 'Show Details'}</td> */}
//               </tr>

//               {/* Product Details Row */}
//               {openProductId === product.productId && (
//                 <tr>
//                   <td colSpan="3">
//                     <div className="p-4">
//                       {product.scanDetails.scanDetails.cveIds.map((cveId, index) => {
//                         const severity = product.scanDetails.scanDetails.severity?.[index] || 'Default'; // Fallback to Default if severity doesn't exist
//                         const severityStyles = getSeverityStyles(severity);

//                         return (
//                           <div key={index} className={`mb-4 ${severityStyles.border} rounded-md`}>
//                             {/* CVE ID Header */}
//                             <div
//                               className={`font-bold ${severityStyles.background} ${severityStyles.text} pt-2 px-2 rounded-t-md`}
//                             >
//                               CVE ID: {cveId}
//                             </div>

//                             {/* CVE Details */}
//                             <div className="mt-2 px-2 pb-2">
//                               <p><b>Description:</b> {product.scanDetails.scanDetails.description}</p>
//                               <p><b>Published Date:</b> {product.scanDetails.scanDetails.publishedDates[index]}</p>
//                               <p><b>Mitigation:</b> {product.scanDetails.scanDetails.mitigations[index]}</p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
// ));
// };

// export default MonitorScanHistoryComponent;


import React, { useState, useEffect } from 'react';

const MonitorScanHistoryComponent = ({ combinedData = [] }) => {
  const [selectedProductId, setSelectedProductId] = useState(null)// Default to the first product

  useEffect(() => {
    if (combinedData.length > 0) {
      setSelectedProductId(combinedData[0].productId);
    }
  }, [combinedData]);
  
  // Define severity colors
  const severityColors = {
    Critical: {
      background: 'bg-[#E10600]',
      text: 'text-white',
      border: 'border-red-700',
    },
    High: {
      background: 'bg-[#FE5000]',
      text: 'text-white',
      border: 'border-orange-700',
    },
    Medium: {
      background: 'bg-[#FFE900]',
      text: 'text-black',
      border: 'border-yellow-500',
    },
    Low: {
      background: 'bg-[#DAF2C9]',
      text: 'text-black',
      border: 'border-green-700',
    },
    Default: {
      background: 'bg-[#3786A2]',
      text: 'text-white',
      border: 'border-[#3786A2]',
    },
  };

  const getSeverityStyles = (severity) => {
    return severityColors[severity] || severityColors.Default; // Default if severity is not found
  };

  const selectedProduct = combinedData.find(
    (product) => product.productId === selectedProductId
  );

  return (
<div className="flex shadow-md rounded-lg h-[80vh] overflow-hidden bg-gradient-to-b from-[#3b82f6] via-[#2563eb] to-[#1e40af]">
  {/* Left Section: Product List */}
  <div className="w-1/4  text-white overflow-y-auto">
    <div className="p-4 font-bold text-lg border-b border-blue-800 shadow-md">
      Products
    </div>
    <ul>
      {combinedData.map((product) => (
        <li
          key={product.productId}
          onClick={() => setSelectedProductId(product.productId)}
          className={`cursor-pointer px-4 py-3 border-b border-blue-900 ${
            selectedProductId === product.productId
              ? 'bg-blue-200 shadow-lg font-semibold text-blue-800'
              : 'hover:bg-blue-600 hover:shadow-md'
          }`}
        >
          <div className="text-lg">{product.productName}</div>
          {product?.scanDetails?.scanDetails?.totalVulnerabilities && (
            <div className="text-sm">
              Vulnerabilities: {product.scanDetails.scanDetails.totalVulnerabilities}
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>

  {/* Right Section: Product Details */}
  <div className="w-3/4 p-4 overflow-y-auto bg-white rounded-lg my-2 mr-2">
    {selectedProduct ? (
      <div>
        <h2 className="text-xl font-bold mb-2">
          {selectedProduct.productName} Details
        </h2>
        <p className="mb-4">
          <b>Description:</b>{' '}
          {selectedProduct.scanDetails.scanDetails.description}
        </p>
        {selectedProduct.scanDetails.scanDetails.cveIds.map((cveId, index) => {
          const severity =
            selectedProduct.scanDetails.scanDetails.severity?.[index] ||
            'Default';
          const severityStyles = getSeverityStyles(severity);

          return (
            <div
              key={index}
              className={`mb-4 ${severityStyles.border} rounded-md`}
            >
              {/* CVE ID Header */}
              <div
                className={`font-bold ${severityStyles.background} ${severityStyles.text} pt-2 px-2 rounded-t-md`}
              >
                CVE ID: {cveId}
              </div>

              {/* CVE Details */}
              <div className="mt-2 px-2 pb-2">
                <p>
                  <b>Published Date:</b>{' '}
                  {selectedProduct.scanDetails.scanDetails.publishedDates[index]}
                </p>
                <p>
                  <b>Mitigation:</b>{' '}
                  {selectedProduct.scanDetails.scanDetails.mitigations[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div>No product selected</div>
    )}
  </div>
</div>

  );
};

export default MonitorScanHistoryComponent;
