import React from 'react';
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from '../../../styles/styles';

const Categories = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Branding Section */}
            <div className={`${styles.section} hidden sm:block`}>
                <div className="branding my-12 flex justify-between w-full shadow-lg bg-white p-6 rounded-xl">
                    {brandingData &&
                        brandingData.map((i, index) => (
                            <div className="flex items-start gap-4" key={index}>
                                <div className="text-3xl text-blue-600">{i.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg text-gray-800">{i.title}</h3>
                                    <p className="text-sm text-gray-500">{i.Description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Categories Section */}
            <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
                <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                    Explore Categories
                </h2>
                
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {categoriesData &&
                        categoriesData.map((i) => {
                            const handleSubmit = () => {
                                navigate(`/products?category=${i.title}`);
                            };

                            return (
                                <div
                                    className="relative group w-full h-[120px] flex flex-col items-center justify-center 
                                    cursor-pointer rounded-lg shadow-md bg-gradient-to-r from-gray-100 to-white 
                                    hover:scale-105 hover:shadow-xl transition-all duration-300"
                                    key={i.id}
                                    onClick={handleSubmit}
                                >
                                    <h5 className="text-[16px] md:text-[18px] font-medium text-gray-800">{i.title}</h5>
                                    <img
                                        src={i.image_Url}
                                        className="w-[90px] md:w-[110px] object-cover mt-2 transition-all duration-300 group-hover:scale-110"
                                        alt="category"
                                    />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default Categories;
