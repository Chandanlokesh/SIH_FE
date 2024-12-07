import React, { useState } from 'react';
import LoginComponent from '../components/LoginSignup/LoginComponent';
import SignUpComponent from '../components/LoginSignup/SignUpComponent';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Frame1 from '../images/IMG1.svg';
import Frame2 from '../images/IMG2.svg';
import Frame3 from '../images/IMG3.svg';
import Frame4 from '../images/IMG4.svg';
import Frame5 from '../images/IMG5.svg';
import '../styles/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true, 
    arrows: false, 
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-scan-pattern bg-cover bg-center">
      {/* Header Row */}
      {/* <header className="w-full bg-white shadow-md p-4 flex items-center">
        <Link to="/">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            Return
          </button>
        </Link>
      </header> */}

      {/* Main Content Row */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left Section (Slick Slider) */}
        <div className="relative w-full md:w-1/2 bg-transparent flex items-center justify-center p-4 md:p-0">
        <Slider className="autoplay w-full" {...settings}>
  <div className='flex flex-col items-center'>
    <img src={Frame1} alt="Slide 1" className="object-contain w-full h-80" />
    <p className="mt-4 text-lg font-bold text-gray-800 text-center">
      Change the scans based on your requirement.
    </p>
  </div>
  <div className='flex flex-col items-center'>
    <img src={Frame2} alt="Slide 2" className="object-contain w-full h-80" />
    <p className="mt-4 text-lg font-bold text-gray-800 text-center">
      Get all your scan details.
    </p>
  </div>
  <div className='flex flex-col items-center'>
    <img src={Frame3} alt="Slide 3" className="object-contain w-full h-80" />
    <p className="mt-4 text-lg font-bold text-gray-800 text-center">
      Know vulnerabilities in the website.
    </p>
  </div>
  <div className='flex flex-col items-center'>
    <img src={Frame4} alt="Slide 4" className="object-contain w-full h-80" />
    <p className="mt-4 text-lg font-bold text-gray-800 text-center">
      Get personalized Email.
    </p>
  </div>
  <div className='flex flex-col items-center'>
    <img src={Frame5} alt="Slide 5" className="object-contain w-full h-80" />
    <p className="mt-4 text-lg font-bold text-gray-800 text-center">
      Become a Pro User.
    </p>
  </div>
</Slider>
        </div>

        {/* Right Section (Login/Signup) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4  relative">
          <div className="w-full max-w-md p-8  bg-opacity-50  rounded-lg">
            {isSignUp ? (
              <SignUpComponent toggleForm={toggleForm} />
            ) : (
              <LoginComponent toggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
