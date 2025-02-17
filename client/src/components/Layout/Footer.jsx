import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import logo from "../../Assests/logo.jpg";

const FooterColumn = ({ title, links }) => (
  <div className="text-center sm:text-left">
    <h1 className="text-lg font-semibold text-white mb-3">{title}</h1>
    <ul>
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          <Link
            to={link.link}
            className="text-gray-400 hover:text-teal-400 duration-300 text-sm"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Subscription Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 bg-yellow-400 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-black text-center md:text-left mb-4 md:mb-0">
          Subscribe to get updates on <br className="hidden md:block" />
          latest news, events & offers!
        </h1>
        <div className="flex items-center w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full md:w-72 px-4 py-2 rounded-l-md text-black focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-teal-500 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links & Social Media */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 py-12 text-center sm:text-left">
        {/* Logo & Social Media */}
        <div className="flex flex-col items-center sm:items-start">
          <img src={logo} alt="Logo" className="h-20 w-20 mb-4" />
          <p className="text-gray-400 text-sm">
            Your go-to place for quality products & services.
          </p>
          <div className="flex gap-4 mt-4">
            <AiFillFacebook className="text-2xl cursor-pointer hover:text-teal-400 transition" />
            <AiOutlineTwitter className="text-2xl cursor-pointer hover:text-teal-400 transition" />
            <AiFillInstagram className="text-2xl cursor-pointer hover:text-teal-400 transition" />
            <AiFillYoutube className="text-2xl cursor-pointer hover:text-teal-400 transition" />
          </div>
        </div>

        {/* Footer Links */}
        <FooterColumn title="Company" links={footerProductLinks} />
        <FooterColumn title="Shop" links={footercompanyLinks} />
        <FooterColumn title="Support" links={footerSupportLinks} />
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6 text-gray-400 text-center text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 md:px-12">
          <span>© 2024 Developed by I Next Ets.</span>
          <span className="mt-2 sm:mt-0">Terms · Privacy Policy</span>
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="Payment Methods"
            className="mt-4 sm:mt-0 w-40"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
