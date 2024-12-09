import React, { useEffect, useState } from 'react';
import { getAPI, postAPI } from '../helpers/apiRequests';
import Cookies from 'js-cookie'; // Assuming you use js-cookie for cookies management.

const MonitorScanComponent = () => {
  const [oemList, setOemList] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [productName, setProductName] = useState("");
  const [productVersion, setProductVersion] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setVendorList(oemList[type] || []);
    setSelectedVendor("");
    setProductName("");
    setProductVersion("");
  };

  const handleClearFields = () => {
    setSelectedType("");
    setVendorList([]);
    setSelectedVendor("");
    setProductName("");
    setProductVersion("");
  };

  const handleStartMonitoring = () => {
    postAPI({
      endpoint: "/monitorscan/start-scan",
      params: {userId: Cookies.get("userId")},
      callback: (response) => {
        if (response.status === 200) {
          setAddedProducts([]);
          handleClearFields();
          alert("Monitoring started!");
        } else {
          alert(response.data.message || "Failed to add product.");
        }
      },
    });

  };

  const getOEMList = () => {
    getAPI({
      endpoint: "/monitorscan/oem-list",
      callback: (response) => {
        if (response.status === 200) {
          setOemList(response.data);
        } else {
          console.error(response.data.message);
        }
      },
    });
  };

  const addProduct = () => {
    const params = {
      userId: Cookies.get("userId"), // Assuming userId is stored in cookies.
      vendorId: vendorList.find((vendor) => vendor.vendorName === selectedVendor)?.vendorId,
      productName,
      productVersion,
    };

    postAPI({
      endpoint: "/monitorscan/add-product",
      params,
      callback: (response) => {
        if (response.status === 200) {
          const newProduct = { productName, productVersion, vendor: selectedVendor };
          setAddedProducts((prev) => [...prev, newProduct].slice(0, 10)); // Limit to 10 products.
          setProductName("");
          setProductVersion("");
        } else {
          alert(response.data.message || "Failed to add product.");
        }
      },
    });
  };

  useEffect(() => {
    getOEMList();
  }, []);

  return (
    <div className="flex p-4 bg-white h-full space-x-4">
      {/* Left Section */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="flex items-center space-x-4">
          <label className="font-semibold text-gray-800">Select Type:</label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="IT"
              checked={selectedType === "IT"}
              onChange={() => handleTypeChange("IT")}
              className="text-blue-500"
              disabled={!oemList}
            />
            <span className="text-gray-700">IT</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="OT"
              checked={selectedType === "OT"}
              onChange={() => handleTypeChange("OT")}
              className="text-blue-500"
              disabled={!oemList}
            />
            <span className="text-gray-700">OT</span>
          </label>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Select Vendor:</label>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className={`w-full p-2 border rounded-md ${!selectedType && "bg-gray-200"}`}
            disabled={!selectedType}
          >
            <option value="">Select Vendor</option>
            {vendorList.map((vendor) => (
              <option key={vendor.vendorId} value={vendor.vendorName}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className={`w-full p-2 border rounded-md ${!selectedVendor && "bg-gray-200"}`}
            required
            disabled={!selectedVendor}
          />
        </div>

        {/* <div>
          <label className="block text-gray-800 font-semibold">Product Version:</label>
          <input
            type="text"
            value={productVersion}
            onChange={(e) => setProductVersion(e.target.value)}
            placeholder="Enter product version (optional)"
            className={`w-full p-2 border rounded-md ${!selectedVendor && "bg-gray-200"}`}
            disabled={!selectedVendor}
          />
        </div> */}

        <div className="flex space-x-4 justify-end">
          <button
            type="button"
            onClick={handleClearFields}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={addProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!productName || !selectedVendor}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-300"></div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="border border-2 rounded-md border-gray-800 min-h-96">
          <div className="flex justify-between items-center bg-gray-200 rounded-t-md p-2">
            <h3 className="font-semibold text-gray-800">Added Products:</h3>
            <p className="text-gray-600">{addedProducts.length}/10</p>
          </div>

          <div className="overflow-y-auto p-2">
            {addedProducts.map((product, index) => (
              <div key={index} className={`p-2 ${index !== 0 ? "border-t border-gray-300" : ""} text-gray-800 flex justify-between`}>
                <div className="w-1/3 text-center">
                  <p className="font-semibold">{product.productName}</p>
                </div>
              </div>
            ))}
            {addedProducts.length === 0 && (
              <p className="text-gray-600 text-sm">No products added yet.</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartMonitoring}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 self-end"
        >
          Start Monitoring
        </button>
      </div>
    </div>
  );
};

export default MonitorScanComponent;

  {/* <div className=" overflow-y-auto max-h-64 p-2">
    {addedProducts.map((product, index) => (
      <div key={index} className={`p-3 ${index!=0? "border-t border-gray-300 ":""} text-gray-800  flex justify-between `}>
        <div className="w-1/3 justify-center">
          <p className="font-semibold">{product.vendor}</p>
        </div>
        <div className="w-1/3 justify-center">
          <p className="font-semibold"> {product.productName}</p>
        </div>
        <div className="w-1/3 justify-center justify-center items-center">
          {product.productVersion && (
            <p className="text-sm text-gray-600"> {product.productVersion}</p>
          )}
        </div>
      </div>
    ))}
    {addedProducts.length === 0 && (
      <p className="text-gray-600 text-sm">No products added yet.</p>
    )}
  </div> */}