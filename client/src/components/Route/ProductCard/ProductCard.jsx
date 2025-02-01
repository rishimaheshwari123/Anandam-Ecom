import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="w-full h-[420px] bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-3 relative cursor-pointer">
      <Link
        to={`${
          isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }`}
      >
        <div className="relative group">
          <img
            src={`${backend_url}${data?.images?.[0]}`} // Optional chaining for the first image
            alt="product"
            className="w-full h-[200px] object-cover rounded-md transition-all duration-300 group-hover:opacity-0"
          />
          {data?.images?.[1] && (
            <img
              src={`${backend_url}${data?.images?.[1]}`} // Optional chaining for the second image
              alt="product hover"
              className="absolute top-0 left-0 w-full h-[200px] object-cover rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            />
          )}
        </div>
      </Link>

      <div className="py-2">
        <Link to={`/product/${data._id}`}>
          <h5 className="font-semibold text-gray-700 text-xl truncate">{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="font-medium text-lg py-2 text-gray-800 truncate">{data.name}</h4>
        </Link>
        <Ratings rating={data?.ratings} />
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-2">
            <h5 className={`${styles.productDiscountPrice} text-xl font-semibold`}>
              {data.originalPrice === 0 ? data.originalPrice : data.discountPrice} ₹
            </h5>
            {data.originalPrice && (
              <h4 className={`${styles.price} line-through text-sm text-gray-500`}>
                {data.originalPrice} ₹
              </h4>
            )}
          </div>
          <span className="text-sm text-green-500 font-medium">{data?.sold_out} sold</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 space-y-2">
        {click ? (
          <AiFillHeart
            size={24}
            className="cursor-pointer text-red-500 transition-all duration-200"
            onClick={() => removeFromWishlistHandler(data)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={24}
            className="cursor-pointer text-gray-500 transition-all duration-200"
            onClick={() => addToWishlistHandler(data)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={24}
          className="cursor-pointer text-gray-500 transition-all duration-200"
          onClick={() => setOpen(!open)}
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={26}
          className="cursor-pointer text-gray-700 transition-all duration-200"
          onClick={() => addToCartHandler(data._id)}
          title="Add to cart"
        />
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
