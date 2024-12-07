// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import TopImage from '../images/Landimage.svg';
// import Frame1 from '../images/IMAS.svg';
// import Frame2 from '../images/AI.svg';
// import Frame3 from '../images/WS.svg';
// import Frame4 from '../images/Cloud.svg';
// import Frame5 from '../images/Notify.svg';
// import LogImg from '../images/Login.svg';
// import FooterImg from '../images/Footerimg.svg';
// import '../styles/App.css';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// // Slider settings
// // Slider settings 
// const settings = { 
//   dots: true, 
//   infinite: true, 
//   slidesToShow: 1,
//    slidesToScroll: 1, 
//    autoplay: true, 
//    autoplaySpeed: 2000, 
//    appendDots: dots =>  (
//      <div> 
//       <ul style={{ margin: "0px" }}> {dots} </ul> 
//       </div> ),
//    customPaging: (i) => ( 
//    <div className="custom-dot"> 
//    {i + 1} 
//    </div>
//    ),
//    };

// const LandingPage = () => {
//   useEffect(() => {
//     const elementsUp = document.querySelectorAll('.fade-in-up');
//     const elementsDown = document.querySelectorAll('.fade-in-down');
    
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add(entry.target.dataset.direction === 'up' ? 'fade-in-up-visible' : 'fade-in-down-visible');
//         }
//       });
//     });

//     elementsUp.forEach((element) => {
//       observer.observe(element);
//     });

//     elementsDown.forEach((element) => {
//       observer.observe(element);
//     });

//     return () => {
//       elementsUp.forEach((element) => {
//         observer.unobserve(element);
//       });
//       elementsDown.forEach((element) => {
//         observer.unobserve(element);
//       });
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="relative w-full fade-in-down h-screen bg-cover bg-center" data-direction="down" style={{ backgroundImage: `url(${TopImage})` }}>
//         <div className="absolute fade-in-down"style={{ left: '7%', bottom: '30%' }} data-direction="down">
//           <Link to="/login">
//             <img className="text-white py-2 px-4 rounded-lg" src={LogImg} alt="Login"  />
//           </Link>
//         </div>
//       </div>
   
//       <div className="mt-8 text-center fade-in-down" data-direction="down">
//         <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
//         <p className="mt-4 text-lg text-gray-700">Your journey starts here.</p>
//         <div className="mt-8" style={{ fontFamily:'K2D'}}>
//           <table className="table-auto mx-auto w-40 w-full max-w-screen-lg h-50 border-collapse">
//             <tbody>
//               <tr className="p-5 fade-in-down" data-direction="down">
//                 <td className="p-5"><img src={Frame1} alt="Image 1" /></td>
//                 <td className="p-5 justify-left" style={{fontSize: '30px',fontWeight:"bold"}} >Intelligent <br></br> Monitoring and Scanning 
//                 <br></br>
//                 <p  style={{fontSize: '15px'}}>"Monitor vulnerabilities effortlessly with automated scans, or perform quick <br></br> single scan by inputting specific OEM websites.Get detailed reports for critical <br></br>IT/OT systems. "</p>
//                 </td>
               
//               </tr>
//               <tr className="p-5 fade-in-down" data-direction="down">
//                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>AI-Driven Insights 
//                 <p  style={{fontSize: '15px'}}>"Our advanced AI analyses vulnerability data, provides severity levels,mitigations strategies,and generates actionable reports.Future plans include implementing GPT-like models for dynamic interactions and insights." </p></td>
//                 <td className="p-5"><img src={Frame2} alt="Image 2" /></td>
//               </tr>
//               <tr className="p-5 fade-in-down" data-direction="down">
//                 <td className="p-5">
//                   <img src={Frame3} alt="Image 3" /></td>
//                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>Advanced Web Scraping 
//                 <p  style={{fontSize: '15px'}}>"Leverage powerful scraping algorithms to extract real-time vulnerability data from OEM websites and other platforms,ensuring no threat goes unnoticed."</p></td>
//               </tr>
//               <tr className="p-5 fade-in-down" data-direction="down">
//                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>Seamless Cloud Integration
//                 <p  style={{fontSize: '15px'}}>"Store all scan results and AI-generated reports securely in the cloud. Access your data whenever you need it,with secure and reliable backups."</p></td>
//                 <td className="p-5">
//                   <img src={Frame4} alt="Image 4"></img></td>
//               </tr>
//               <tr className="p-5 fade-in-down" data-direction="down">
//                 <td className="p-5">
//                   <img src={Frame5} alt="Image 5" /></td>
//                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>Instant Notifications
//                 <p  style={{fontSize: '15px'}}>"Recieve instant email notifications about detected vulnerabilities,ensuring you take action before threats escalate"</p></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Carousel */}
//       <div className="w-full max-w-screen-lg mx-auto mt-8 mb-5">
//         <Slider {...settings}>
//           <div className="relative mb-5" >
//             <img src={Frame1} alt="Slide 1" className="object-contain w-full h-[28rem]" />
//           </div>
//           <div className="relative">
//             <img src={Frame2} alt="Slide 2" className="object-contain w-full h-[28rem]" />
//           </div>
//           <div className="relative">
//             <img src={Frame3} alt="Slide 3" className="object-contain w-full h-[28rem]" />
//           </div>
//           <div className="relative">
//             <img src={Frame4} alt="Slide 4" className="object-contain w-full h-[28rem]" />
//           </div>
//         </Slider>
//       </div>
//     <div className="w-full bg-cover bg-center mt-8 p-8" style={{ backgroundImage: `url(${FooterImg})` }}>
//     <div className="text-black" style={{fontFamily:'K2D', fontSize: '15px' }}> 
//     <p>&copy; 2024 Your Company. All rights reserved.</p>
//      <p>Contact: info@yourcompany.com</p>
//      </div>
//     </div>
//     </div>
//   );
// };

// export default LandingPage;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopImage from '../images/Landimage.svg';
import Frame1 from '../images/IMAS.svg';
import Frame2 from '../images/AI.svg';
import Frame3 from '../images/WS.svg';
import Frame4 from '../images/Cloud.svg';
import Frame5 from '../images/Notify.svg';
import LogImg from '../images/Login.svg';
import FooterImg from '../images/Footerimg.svg';
import '../styles/App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  appendDots: dots => <div><ul style={{ margin: "0px" }}>{dots}</ul></div>,
  customPaging: i => <div className="custom-dot">{i + 1}</div>,
};

const LandingPage = () => {
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
      threshold: 0.05, // Adjust visibility threshold
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
              <td className="p-5" style={{ fontSize: '30px', fontWeight: 'bold' }}>
                Intelligent Monitoring and Scanning
                <p style={{ fontSize: '15px' }}>
                  "Monitor vulnerabilities effortlessly with automated scans, or perform a quick scan by inputting specific OEM websites. Get detailed reports for critical IT/OT systems."
                </p>
              </td>
            </tr>
            <tr className="p-5 fade-in">
                <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>AI-Driven Insights 
               <p  style={{fontSize: '15px'}}>"Our advanced AI analyses vulnerability data, provides severity levels,mitigations strategies,and generates actionable reports.Future plans include implementing GPT-like models for dynamic interactions and insights." </p></td>
                 <td className="p-5"><img src={Frame2} alt="Image 2" /></td>
               </tr>
               <tr className="p-5 fade-in">
                 <td className="p-5">
                   <img src={Frame3} alt="Image 3" /></td>
                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>Advanced Web Scraping 
                 <p  style={{fontSize: '15px'}}>"Leverage powerful scraping algorithms to extract real-time vulnerability data from OEM websites and other platforms,ensuring no threat goes unnoticed."</p></td>
               </tr>
               <tr className="p-5 fade-in">
                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>Seamless Cloud Integration
                 <p  style={{fontSize: '15px'}}>"Store all scan results and AI-generated reports securely in the cloud. Access your data whenever you need it,with secure and reliable backups."</p></td>
                 <td className="p-5">
                   <img src={Frame4} alt="Image 4"></img></td>
               </tr>
               <tr className="p-5 fade-in">
                 <td className="p-5">
                   <img src={Frame5} alt="Image 5" /></td>
                 <td className="p-5" style={{fontSize: '30px',fontWeight:"bold"}}>Instant Notifications
                 <p  style={{fontSize: '15px'}}>"Recieve instant email notifications about detected vulnerabilities,ensuring you take action before threats escalate"</p></td>
               </tr>


          </tbody>
        </table>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-screen-lg mx-auto mt-8 ">
        <Slider {...settings}>
          <div><img src={Frame1} alt="Slide 1" className="object-contain w-full h-[28rem]" /></div>
          <div><img src={Frame2} alt="Slide 2" className="object-contain w-full h-[28rem]" /></div>
          <div><img src={Frame3} alt="Slide 3" className="object-contain w-full h-[28rem]" /></div>
          <div><img src={Frame4} alt="Slide 4" className="object-contain w-full h-[28rem]" /></div>
        </Slider>
      </div>

      {/* Footer */}
      <div className="w-full bg-cover bg-center mt-8 p-8 bg-cover" style={{ backgroundImage: `url(${FooterImg})` }}>
        <div className="text-black" style={{ fontFamily: 'K2D', fontSize: '15px' }}>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <p>Contact: info@yourcompany.com</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
