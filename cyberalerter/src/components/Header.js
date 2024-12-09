import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="w-full bg-[#03000F] text-white py-3 px-6 drop-shadow-lg fixed">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
  
};

export default Header;
