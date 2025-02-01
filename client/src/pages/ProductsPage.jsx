import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000000 });

  useEffect(() => {
    if (!Array.isArray(allProducts)) return; // Check if allProducts is an array
  
    let filteredData = allProducts;
  

    // Filter by category if provided
    if (categoryData) {
      filteredData = filteredData.filter((product) => product.category === categoryData);
    }
  
    // Filter by price range
    filteredData = filteredData.filter((product) =>
      product.discountPrice >= priceRange.min && product.discountPrice <= priceRange.max
    );
  
    // Sorting logic based on selected sort option
    if (sortOption === "lowToHigh") {
      filteredData = filteredData.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOption === "highToLow") {
      filteredData = filteredData.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortOption === "aToZ") {
      filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "zToA") {
      filteredData = filteredData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "newest") {
      filteredData = filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      filteredData = filteredData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
  
    console.log(filteredData)
    setData(filteredData);
  }, [allProducts, categoryData, sortOption, priceRange]);
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="flex justify-between mb-4">
              {/* Sorting Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="">Sort By</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>

              {/* Price Range Filter */}
              <div className="flex items-center">
                <span>Price: </span>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="border border-gray-300 p-2 rounded ml-2"
                  placeholder="Min"
                />
                <span className="mx-2">to</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>

            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
