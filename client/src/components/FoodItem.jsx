// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import React, { useContext } from 'react'
import "./FoodItem.css";
import { assets } from "./../../frontend_assets/assets";
import { storeContext } from "./../pages/redux/context/storeContext";
import { useContext } from "react";

const FoodItem = ({ id, name, price, description, image, stock }) => {
  const { cartItems, addtoCart, removeCart } = useContext(storeContext);

  return (
    <div className="food-item transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="food-item-img-container">
        <img
          src={`http://localhost:3000/images/${image}`}
          alt="food"
          className={`food-item-image bg-slate-100 ${
            stock === 0 ? "grayscale" : ""
          }`}
        />
        {stock === 0 ? (
          <span className="sold-out-badge">Sold Out</span>
        ) : stock < 10 ? (
          <span className="low-stock-badge">Low Stock : {stock}</span>
        ) : null}

{!cartItems[id] ? (
  <img
    className="add"
    onClick={() => stock > 0 && addtoCart(id)} // Only allow adding if stock is greater than 0
    src={assets.add_icon_white}
    alt="Add to Cart"
  />
) : (
  <div className="food-item-counter">
    <img
      onClick={() => removeCart(id)}
      src={assets.remove_icon_red}
      alt="Remove from Cart"
    />
    <p>{cartItems[id]}</p>
    <img
      onClick={() => {
        // Only allow adding if current quantity is less than stock
        if (cartItems[id] < stock) addtoCart(id);
      }}
      src={assets.add_icon_green}
      alt="Add to Cart"
    />
  </div>
)}

      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="h-8 m-2">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc h-16">{description}</p>
        <p className="food-item-price">Rs. {price}/-</p>
      </div>
    </div>
  );
};
export default FoodItem;
