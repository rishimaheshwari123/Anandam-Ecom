import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  // Remove from wish list
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  // add to wish list
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  // Add to cart
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart Successfully!");
      }
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  // Sand message
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  className="w-[80%]"
                  src={
                    data?.images[select]?.startsWith(
                      "https://res.cloudinary.com"
                    )
                      ? data.images[select]
                      : `${backend_url}${data?.images[select]}`
                  }
                  alt="Image"
                />

                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          src={
                            i?.startsWith("https://res.cloudinary.com")
                              ? i
                              : `${backend_url}${i}`
                          }
                          alt="Image"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer `}
                  >
                    {/* <img
                                            src={data?.image_Url[1].url}
                                            alt="img"
                                            className="h-[200px]"
                                            onClick={() => setSelect(1)}
                                        /> */}
                  </div>
                </div>
              </div>
              {/* Rtght */}
              <div className="w-full 800px:w-[50%] pt-5 ">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}₹
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "₹" : null}
                  </h3>
                </div>

                {/* inc dec option */}
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>

                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>

                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>

                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3
                        className={`${styles.shop_name} pb-1 pt-1 cursor-pointer`}
                      >
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      {" "}
                      ({averageRating}/5) Ratingss
                    </h5>
                  </div>

                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details  info */}

          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-5 py-4 rounded-lg shadow-lg">
      <div className="flex justify-between border-b border-gray-300 pb-4">
        <div className="relative cursor-pointer" onClick={() => setActive(1)}>
          <h5
            className={`text-[#000] text-lg font-semibold ${
              active === 1 ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition`}
          >
            Product Details
          </h5>
          {active === 1 && (
            <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-blue-600" />
          )}
        </div>

        <div className="relative cursor-pointer" onClick={() => setActive(2)}>
          <h5
            className={`text-[#000] text-lg font-semibold ${
              active === 2 ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition`}
          >
            Product Reviews
          </h5>
          {active === 2 && (
            <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-blue-600" />
          )}
        </div>

        <div className="relative cursor-pointer" onClick={() => setActive(3)}>
          <h5
            className={`text-[#000] text-lg font-semibold ${
              active === 3 ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition`}
          >
            Seller Information
          </h5>
          {active === 3 && (
            <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-blue-600" />
          )}
        </div>
      </div>

      {active === 1 && (
        <p className="py-4 text-lg leading-8 whitespace-pre-line">
          {data.description}
        </p>
      )}

      {/* Product Reviews */}
      {active === 2 && (
        <div className="w-full min-h-[40vh] py-4 overflow-y-auto">
          {data && data.reviews.length === 0 ? (
            <h5 className="text-center text-xl text-gray-500">
              No Reviews for this product!
            </h5>
          ) : (
            data.reviews.map((item, index) => (
              <div key={index} className="flex my-4 border-b pb-4">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt="user-avatar"
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-3 flex-1">
                  <div className="flex items-center">
                    <h1 className="font-semibold mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p className="text-sm text-gray-600">{item.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Seller Information */}
      {active === 3 && (
        <div className="w-full flex flex-col md:flex-row gap-6 p-5">
          <div className="w-full md:w-[50%]">
            <Link
              to={`/shop/preview/${data.shop._id}`}
              className="flex items-center"
            >
              <img
                src={`${backend_url}${data?.shop?.avatar}`}
                alt="shop-avatar"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className="text-lg font-semibold">{data.shop.name}</h3>
                <h5 className="text-sm text-gray-500">
                  ({averageRating}/5) Ratings
                </h5>
              </div>
            </Link>
            <p className="pt-4 text-gray-600">{data.shop.description}</p>
          </div>

          <div className="w-full md:w-[50%] flex flex-col items-start md:items-end">
            <div className="text-left">
              <h5 className="font-semibold">Joined on:</h5>
              <p className="font-medium">
                {data.shop?.createdAt?.slice(0, 10)}
              </p>

              <h5 className="font-semibold pt-4">Total Products:</h5>
              <p className="font-medium">{products && products.length}</p>

              <h5 className="font-semibold pt-4">Total Reviews:</h5>
              <p className="font-medium">{totalReviewsLength}</p>

              <Link to="/" className="mt-4 w-full md:w-auto">
                <div className="bg-blue-600 text-white py-2 px-6 rounded-md text-center hover:bg-blue-700 transition">
                  Visit Shop
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
