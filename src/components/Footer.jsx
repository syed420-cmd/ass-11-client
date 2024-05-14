import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
const Footer = () => {
  return (
    <div>

      <div className="bg-blue-800 grid grid-cols-3 h-[400px] rounded-[15px_15px] w-full gap-[40px] place-items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[32px] text-white font-[600]">Contacts</h2>
          <h2 className="text-white text-[26px]">Mail:abcblog23@gmail.com</h2>
          <h2 className="text-white text-[26px]">whatsappp:+1536274687368</h2>
          <h2 className="text-white text-[26px]">Phone:+9326492632846</h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[32px] text-white font-[600]">Social Media</h2>
          <FaFacebook className="text-white h-[30px] w-[30px]" />
          <FaInstagramSquare className="h-[30px] mt-[20px] w-[30px] text-white" />
          <FaXTwitter className="h-[30px] text-white mt-[10px] w-[20px]" />  
          <FaSquareWhatsapp className="h-[30px] mt-[10px] text-white w-[30px]" />

        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[32px] text-white font-[600]">Location</h2>
          <h2 className="text-[28px] text-white font-[400]">Malibag,Dhaka,Bangladesh</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
