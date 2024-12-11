import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopImage from '../images/Landimage.svg';
import Frame1 from '../images/IMAS.svg';
import Frame2 from '../images/AI.svg';
import Frame3 from '../images/WS.svg';
import Frame4 from '../images/Cloud.svg';
import Frame5 from '../images/Notify.svg';
import LogImg from '../images/Login.svg';
 import linkedin from '../images/logo/linkedIn.png';
import email from '../images/logo/gmail.png';
import github from '../images/logo/github.png';
import FooterImg from '../images/Footerimg.svg';
import logo from '../images/logo/newLogo.svg';
import Recording from '../images/video/step.mp4';
import '../styles/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        } else {
          entry.target.classList.remove('fade-in-visible');
        }
      });
    };

    const observerOptions = {
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Top Image Section */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${TopImage})` }}>
        <div style={{ left: '1%', top: '2%', position: 'absolute' }}>
          <img src={logo} alt="Back Button" className="w-12 h-12" />
        </div>
        <div className="absolute" style={{ left: '7%', bottom: '30%' }}>
          <Link to="/login">
            <img className="text-white py-2 px-4 rounded-lg" src={LogImg} alt="Login" />
          </Link>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mt-8 text-center fade-in">
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
        <p className="mt-4 text-lg text-gray-700">Your journey starts here.</p>
      </div>

      {/* Table Section */}
      <div className="mt-8 fade-in" style={{ fontFamily: 'K2D' }}>
        <table className="table-auto mx-auto w-full max-w-screen-lg">
          <tbody>
            <tr className="p-5 fade-in">
              <td className="p-5">
                <img src={Frame1} alt="Image 1" />
              </td>
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Intelligent Monitoring and Scanning
                <p style={{ fontSize: "15px" }}>
                  "Monitor vulnerabilities effortlessly with automated scans, or perform a quick scan by inputting specific OEM websites. Get detailed reports for critical IT/OT systems."
                </p>
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                AI-Driven Insights
                <p style={{ fontSize: "15px" }}>
                  "Our advanced AI analyses vulnerability data, provides severity levels,mitigations strategies,and generates actionable reports.Future plans include implementing GPT-like models for dynamic interactions and insights."{" "}
                </p>
              </td>
              <td className="p-5">
                <img src={Frame2} alt="Image 2" />
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5">
                <img src={Frame3} alt="Image 3" />
              </td>
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Advanced Web Scraping
                <p style={{ fontSize: "15px" }}>
                  "Leverage powerful scraping algorithms to extract real-time vulnerability data from OEM websites and other platforms,ensuring no threat goes unnoticed."
                </p>
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Seamless Cloud Integration
                <p style={{ fontSize: "15px" }}>
                  "Store all scan results and AI-generated reports securely in the cloud. Access your data whenever you need it,with secure and reliable backups."
                </p>
              </td>
              <td className="p-5">
                <img src={Frame4} alt="Image 4"></img>
              </td>
            </tr>
            <tr className="p-5 fade-in">
              <td className="p-5">
                <img src={Frame5} alt="Image 5" />
              </td>
              <td className="p-5" style={{ fontSize: "30px", fontWeight: "bold" }}>
                Instant Notifications
                <p style={{ fontSize: "15px" }}>
                  "Recieve instant email notifications about detected vulnerabilities,ensuring you take action before threats escalate"
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

     {/* Video Section */}
<div className="w-full max-w-screen-lg mx-auto mt-8 mb-12 relative bg-[#E6F7FF] bg-opacity-85 p-2 rounded-md shadow-2xl">
  <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2" style={{ fontSize: "32px"}}>
    "How CYBER ALERTER works?"
  </h2>
  <video
    className="w-full h-[28rem]"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src={Recording} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

      {/* Footer */}
      <div className="w-full bg-cover bg-center mt-8 p-8" style={{ backgroundImage: `url(${FooterImg})` }}>
  <div className="flex justify-between items-center flex-col md:flex-row" style={{ fontFamily: 'K2D', fontSize: '15px' }}>
    {/* Social Media Links */}
    <div className="flex items-center space-x-6 mb-4 md:mb-0">
  <a 
    href="https://github.com/your-github-id" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center space-x-1 hover:text-gray-700 transition duration-300 transform hover:scale-150"
  >
    <img src={github} alt="github" className="w-6 h-6" />
  </a>
  
  <a 
    href="https://www.linkedin.com/in/your-linkedin-id" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center space-x-1 hover:text-blue-500 transition duration-300 transform hover:scale-150 border border-white"
  >
    <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
  </a>
  
  <a 
    href="https://gmail.com/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center space-x-1 hover:text-gray-700 transition duration-300 transform hover:scale-150"
  >
    <img src={email} alt="gmail" className="w-6" />
  </a>
</div>


    {/* Footer Text with Email and Copyright */}
    <div className="text-white text-center md:text-right">
      <p><span className='text-2xl'>&copy;</span> Team @ROOT.</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default LandingPage;
