// import React from 'react'
import { Link } from "react-router-dom";
import empty_cart from "./../../assets/11329060.png";

export const Empty = () => {
  return (
    <div className=" mx-40 flex mt-40 justify-evenly items-center">
      <div>
        <img src={empty_cart} alt="" className="h-96" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p>
          Looks like you not added anything in your cart. Go ahead and explore
          categories
        </p>
        <Link to="/Market">
          <button className="bg-orange-400 p-3 rounded-lg hover:opacity-90">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
};
