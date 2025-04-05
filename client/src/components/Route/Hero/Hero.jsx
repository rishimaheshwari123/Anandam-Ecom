import React from 'react';
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Hero = () => {
    return (
        <div className="relative w-full min-h-scree flex flex-col md:flex-row items-cente justify-between bg-gray-100 px-6 md:px-16 mt-[40px]">
            {/* Left Content Section */}
            <div className="md:w-1/2 text-center md:text-left space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Welcome to <span className="text-yellow-600">Anandam</span>
                </h1>
                <p className="text-lg text-gray-700">
                    Your one-stop destination for the best shopping experience. Get amazing deals on fashion, electronics, and more!
                </p>
                <Link to="/products">
                    <button className="mt-4 px-6 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition">
                        Start Shopping
                    </button>
                </Link>
                
                {/* Contact Section */}
                <div className="mt-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  
                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-yellow-500 text-2xl" />
                        <span className="text-gray-800 text-lg">support@anandam.com</span>
                    </div>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                <img src="/ban2.png" alt="Anandam Banner" className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default Hero;
