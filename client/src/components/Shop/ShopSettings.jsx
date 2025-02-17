import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(seller && seller.description ? seller.description : "");
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  // Image updated
  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios.put(`${server}/shop/update-shop-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res) => {
      dispatch(loadSeller());
      toast.success("Avatar updated successfully!");
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios.put(`${server}/shop/update-seller-info`, {
      name,
      address,
      zipCode,
      phoneNumber,
      description,
    }, { withCredentials: true }).then((res) => {
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  return (
    <div className="w-full max-h-[85vh] flex flex-col items-center overflow-y-scroll bg-gray-50 p-6">
      <div className="flex w-full md:w-[80%] flex-col justify-center my-5 bg-white shadow-lg p-6 rounded-lg">
        {/* Avatar Section */}
        <div className="w-full flex justify-center">
          <div className="relative">
            <img
              src={avatar ? URL.createObjectURL(avatar) : `${seller.avatar}`}
              alt="Avatar"
              className="w-[150px] h-[150px] rounded-full border-4 border-gray-200 cursor-pointer shadow-md"
            />
            <div className="w-[35px] h-[35px] bg-gray-200 rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* Shop Info Form */}
        <form onSubmit={updateHandler} className="flex flex-wrap justify-center mt-6 gap-6">
          {/* Shop Name */}
          <div className="w-full md:w-[48%]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name</label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Shop Description */}
          <div className="w-full md:w-[48%]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Description</label>
            <input
              type="text"
              placeholder="Enter Shop Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Shop Address */}
          <div className="w-full md:w-[48%]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Address</label>
            <input
              type="text"
              placeholder="Enter Shop Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Shop Phone Number */}
          <div className="w-full md:w-[48%]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="number"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Shop Zip Code */}
          <div className="w-full md:w-[48%]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Zip Code</label>
            <input
              type="number"
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Update Button */}
          <div className="w-full flex justify-center mt-6">
            <button
              type="submit"
              className="w-[95%] md:w-[48%] bg-blue-500 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Update Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
