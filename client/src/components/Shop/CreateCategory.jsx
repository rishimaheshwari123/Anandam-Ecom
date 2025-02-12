import React, { useState, useEffect } from "react";
import {
  fetchCategory,
  deleteCategory,
  createCategory,
} from "../../redux/actions/event";
import Swal from "sweetalert2";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });

  const fetchCategories = async () => {
    try {
      const response = await fetchCategory();
      setCategories(response?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory(newCategory.name);

      if (response) {
        setNewCategory({ name: "" });
        fetchCategories();
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Category Created Successfully!",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Category Deleted Successfully",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      setCategories(
        (prevCategories) =>
          prevCategories?.filter((category) => category?._id !== categoryId) ||
          []
      );
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <div className="text-center text-2xl font-semibold text-black mb-4">
        <h4>Manage Categories</h4>
      </div>

      {/* Create Category Section */}
      <div className="mb-6 p-4 border border-gray-700 rounded-lg ">
        <h5 className="text-xl text-center font-semibold text-black mb-3">
          Create New Category
        </h5>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory?.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="w-full mb-3 p-2 border border-gray-600 rounded-lg  text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateCategory}
          className="w-full p-2  text-black border-gray-500 border-2 rounded-lg"
        >
          Create Category
        </button>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full  shadow-md rounded-lg">
          <thead className=" text-black">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 ? (
              categories?.map((category) => (
                <tr key={category?._id} className="border-b border-black">
                  <td className="py-4 px-6 text-black">
                    {category?.name || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDelete(category?._id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-400">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateCategory;
