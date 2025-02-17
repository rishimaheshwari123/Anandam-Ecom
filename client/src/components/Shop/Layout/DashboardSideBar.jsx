import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
} from "react-icons/ai";
import {
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import {
  CiMoneyBill,
  CiSettings,
} from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const menuItems = [
  { id: 1, name: "Dashboard", icon: RxDashboard, link: "/dashboard" },
  { id: 2, name: "All Orders", icon: FiShoppingBag, link: "/dashboard-orders" },
  { id: 3, name: "All Products", icon: FiPackage, link: "/dashboard-products" },
  { id: 4, name: "Create Product", icon: AiOutlineFolderAdd, link: "/dashboard-create-product" },
  { id: 5, name: "All Events", icon: MdOutlineLocalOffer, link: "/dashboard-events" },
  { id: 6, name: "Create Event", icon: VscNewFile, link: "/dashboard-create-event" },
  { id: 15, name: "Create Category", icon: VscNewFile, link: "/dashboard-create-category" },
  { id: 7, name: "Withdraw Money", icon: CiMoneyBill, link: "/dashboard-withdraw-money" },
  { id: 8, name: "Shop Inbox", icon: BiMessageSquareDetail, link: "/dashboard-messages" },
  { id: 9, name: "Discount Codes", icon: AiOutlineGift, link: "/dashboard-coupouns" },
  { id: 10, name: "Refunds", icon: HiOutlineReceiptRefund, link: "/dashboard-refunds" },
  { id: 11, name: "Settings", icon: CiSettings, link: "/settings" },
];

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[85vh] bg-gray-900 text-white shadow-md overflow-y-auto sticky top-0 left-0">
      <div className="py-5 px-6">
        <h2 className="text-xl font-semibold text-gray-300 hidden md:block">Dashboard</h2>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4">
        {menuItems.map(({ id, name, icon: Icon, link }) => (
          <Link
            key={id}
            to={link}
            className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
              active === id
                ? "bg-gray-800 text-crimson font-semibold"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Icon size={24} className="mr-3" />
            <span className="hidden md:block">{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSideBar;
