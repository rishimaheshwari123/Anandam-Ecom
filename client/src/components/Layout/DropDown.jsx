import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.name}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(i)}
          >
            <h3 className="m-3 cursor-pointer select-none">{i.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
