import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import CreateEvent from "../../components/Shop/CreateEvent";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateCategory from "../../components/Shop/CreateCategory";

const ShopCreateCategory = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px] ">
          <DashboardSideBar active={15} />
        </div>
        <div className="w-full justify-center flex">
          <CreateCategory />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateCategory;
