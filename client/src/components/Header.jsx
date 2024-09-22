// import React from 'react'
import {
  FaSearch,
  FaRegHeart,
  FaShoppingBag,
} from "react-icons/fa";
import user_image from "./../../assets/user_img.png"
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useContext } from "react";
import { storeContext } from "../pages/redux/context/storeContext";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {cartQuantity} = useContext(storeContext)
  // const {setToken} = useContext(storeContext)

  // const logout = () => {
  //   localStorage.removeItem("token")
  //   setToken("")
  // }

  return (
    <header className="bg-slate-300 shadow-md fixed top-0 left-0 min-w-full z-50">
      <div className="flex items-center p-3 justify-between  max-w-7xl mx-8 gap-16">
        <Link to='/'>
          <h1 className="cursor-pointer">
            <span className="font-bold text-3xl text-blue-600">Harvest</span>
            <span className="font-bold text-2xl text-sky-600">
              Hub
            </span>
          </h1>
        </Link>

        <ul className="flex gap-6">

          <Link to='/Market'>
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              Market
            </li>
          </Link>

          <Link to='/About'>
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              About
            </li>
          </Link>

          <Link to='/Schemes'>
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              Schemes
            </li>
          </Link>

          <Link to='/Articles'>
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              Articles
            </li>
          </Link>

          <Link to='/'>
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              Home
            </li>
          </Link>

        </ul>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center justify-between">
          <input
            type="text"
            placeholder="Search.."
            id="search"
            className="bg-transparent focus:outline-none w-24 sm:w-72"
          />
          <FaSearch className="text-slate-600 w-8 text-xl" />
        </form>

        <ul className="flex gap-6 ">
          <li className="font-bold  flex flex-col items-center justify-center cursor-pointer">
            <FaRegHeart />
            wishlist
          </li>
          <Link to="/cart">
          <li className="flex">
            <div className="font-bold  flex flex-col items-center justify-center cursor-pointer p-2">
              <FaShoppingBag />
              Cart
            </div>
            <span
              style={{
                height: "23px",
                backgroundColor: "red",
                width: "20px",
                textAlign: "center",
                color: "white",
                position: "relative",
                right: "25px",
                bottom: "5px",
                borderRadius: "50%",
              }}
            >
              {cartQuantity()}
            </span>
          </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              // <img
              //   className='rounded-full h-7 w-7 object-cover'
              //   src={currentUser.avatar}
              //   alt='profile'
              // />
                <div className="flex flex-col justify-center items-center -ml-4">
                  <img src={user_image} alt="" width="30px" />
                  <p>{currentUser.username}</p>
                </div>
            ) : (
              <li className="font-bold  flex flex-col items-center justify-center cursor-pointer hover:text-lg">
            <IoPersonSharp className="text-xl" />
            Login
          </li>
            )}
          </Link>
        </ul>

        {currentUser ? <div className="bg-blue-500 p-1 px-3 border-blue-600 border-2 rounded-3xl cursor-pointer hover:bg-blue-400">
          Logout
        </div> : <></>}
      </div>
    </header>
  );
};
