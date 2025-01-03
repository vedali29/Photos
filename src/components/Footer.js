import React from 'react';

const Footer = () => {
  return (
    <div className="relative overflow-hidden bg-black text-white">
      <div id="lightings" className="absolute -bottom-16 w-full">
        <div id="one" className="relative mx-auto my-2 h-5 w-full rounded-full"></div>
        <div id="two" className="relative mx-auto my-2 h-5 w-11/12 rounded-full"></div>
        <div id="three" className="relative mx-auto my-2 h-5 w-10/12 rounded-full"></div>
        <div id="four" className="relative mx-auto my-2 h-5 w-9/12 rounded-full"></div>
        <div id="five" className="relative mx-auto my-2 h-5 w-8/12 rounded-full"></div>
      </div>
    </div>
  );
};

export default Footer;
