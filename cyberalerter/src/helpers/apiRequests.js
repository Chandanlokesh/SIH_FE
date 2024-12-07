import axios from 'axios';
import { BASE_URL } from "../data/EndPoints";
import Cookies from 'js-cookie';
export const postAPI = ({
  endpoint,
  params,
  callback,
  addAuth = true, // Add Authorization by default
}) => {
  const token = Cookies.get('token'); // Retrieve token from cookies

  // Dynamically set headers based on addAuth
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(addAuth && token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if addAuth is true
  };

  axios({
    method: 'POST',
    url: `${BASE_URL}${endpoint}`,
    data: params, // For POST, data is sent in the body
    headers: headers, // Use dynamic headers
  })
    .then(function (response) {
      callback(response); // Call the callback function with the response
    })
    .catch((error) => {
      const errorResponse = error.response || { status: 500, data: { message: "Unexpected error occurred" } };
      console.error("API Error:", errorResponse.data.message);
      callback(errorResponse); // Pass the error response to the callback
    });
};

  
  export const getAPI = ({
    endpoint,
    params = {}, // Optional params for query strings
    callback,
    addAuth = true, // Add Authorization by default
  }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
  
    // Dynamically set headers based on addAuth
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(addAuth && token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if addAuth is true
    };
  
    axios({
      method: 'GET',
      url: `${BASE_URL}${endpoint}`,
      params: params, // Params are sent as query string in GET requests
      headers: headers, // Use dynamic headers
    })
      .then(function (response) {
        callback(response); // Call the callback function with the response
      })
      .catch((error) => {
        const errorResponse = error.response || { status: 500, data: { message: "Unexpected error occurred" } };
        console.error("API Error:", errorResponse.data.message);
        callback(errorResponse); // Pass the error response to the callback
      });
  };
  
  export const Upgrade = (setUserData) => {
    const storedData = localStorage.getItem("userData");
    let userData = storedData ? JSON.parse(storedData) : null;
  
    const userId = Cookies.get("userId");
    postAPI({
      endpoint: "/Users/upgrade",
      params: {
        userId: userId,
      },
      callback: (response) => {
        if (response.status === 200) {
          // Handle success
          console.log(response.data.message);
          userData.subscriptionPlan = "Pro";
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log("[sub] Updated to pro,", userData);
          alert('Subscribed successfully');
  
          // Update the state again after API success to ensure UI reflects the change
          setUserData(userData);  // Trigger UI update
        } else {
          // Handle error response
          console.error(response.data.message);
        }
      },
    });
  };
  