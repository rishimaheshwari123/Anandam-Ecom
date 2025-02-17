import React, { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const availableBalance = seller?.availableBalance?.toFixed(2) || "0.00";

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600"
          : "text-red-600",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button className="text-blue-600 hover:text-blue-800">
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.cart.reduce((acc, i) => acc + i.qty, 0),
    total: `INR₹ ${item.totalPrice}`,
    status: item.status,
  })) || [];

  return (
    <div className="w-full p-8 bg-gray-100 max-h-[85vh] overflow-y-scroll">
      <h3 className="text-2xl font-semibold pb-4">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <AiOutlineMoneyCollect size={30} className="text-gray-700" />, 
            title: "Account Balance",
            subtitle: "(with 10% service charge)",
            value: availableBalance,
            link: "/dashboard-withdraw-money",
            linkText: "Withdraw Money",
          },
          {
            icon: <MdBorderClear size={30} className="text-gray-700" />, 
            title: "All Orders",
            value: orders?.length || 0,
            link: "/dashboard-orders",
            linkText: "View Orders",
          },
          {
            icon: <AiOutlineMoneyCollect size={30} className="text-gray-700" />, 
            title: "All Products",
            value: products?.length || 0,
            link: "/dashboard-products",
            linkText: "View Products",
          },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-lg font-medium text-gray-700">
                {item.title} <span className="text-sm text-gray-500">{item.subtitle}</span>
              </h3>
            </div>
            <h5 className="pt-3 text-2xl font-semibold">{item.value}</h5>
            <Link to={item.link} className="text-blue-600 hover:underline mt-3 block">
              {item.linkText}
            </Link>
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-semibold mt-8 pb-4">Latest Orders</h3>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default DashboardHero;
