import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="w-full bg-white text-black py-4 px-6 drop-shadow-lg fixed">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default Header;
