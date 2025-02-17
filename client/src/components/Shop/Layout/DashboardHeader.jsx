import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";
import logo from "../../../Assests/logo.jpg";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[80px] bg-white shadow-lg sticky top-0 left-0 z-30 flex items-center justify-between px-6 py-4">
      <div>
        <Link to="/dashboard">
          <img src={logo} alt="Logo" className="h-16 w-20 object-contain" />
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* <Link to="/dashboard/cupouns" className="hidden md:block">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-2 cursor-pointer hover:text-crimson transform transition-all duration-200 ease-in-out hover:scale-110"
            />
          </Link>
          <Link to="/dashboard-events" className="hidden md:block">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-2 cursor-pointer hover:text-crimson transform transition-all duration-200 ease-in-out hover:scale-110"
            />
          </Link>
          <Link to="/dashboard-products" className="hidden md:block">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-2 cursor-pointer hover:text-crimson transform transition-all duration-200 ease-in-out hover:scale-110"
            />
          </Link>
          <Link to="/dashboard-orders" className="hidden md:block">
            <FiPackage
              color="#555"
              size={30}
              className="mx-2 cursor-pointer hover:text-crimson transform transition-all duration-200 ease-in-out hover:scale-110"
            />
          </Link>
          <Link to="/dashboard-messages" className="hidden md:block">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-2 cursor-pointer hover:text-crimson transform transition-all duration-200 ease-in-out hover:scale-110"
            />
          </Link> */}

          {/* Profile Avatar */}
          <Link to={`/shop/${seller._id}`} className="relative">
            <img
              src={`${seller.avatar}`}
              alt="Seller Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
            />
            <span className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-crimson rounded-full border-2 border-white"></span> {/* Online status */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
