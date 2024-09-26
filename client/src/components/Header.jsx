// import React from 'react'
import { FaRegHeart, FaShoppingBag } from "react-icons/fa";
import user_image from "./../../assets/user_img.png";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { storeContext } from "../pages/redux/context/storeContext";
import { logoutSuccess } from "../../src/pages/redux/user/userSlice"
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const Header = () => {
  let { currentUser } = useSelector((state) => state.user);
  const { cartQuantity } = useContext(storeContext);
  const { setToken } = useContext(storeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    dispatch(logoutSuccess())
    navigate("/");
  };

  return (
    <header className="bg-slate-300 shadow-md fixed top-0 left-0 min-w-full z-50">
      <div className="flex items-center p-3 justify-between  max-w-7xl mx-8 gap-16">
        <Link to="/">
          <h1 className="cursor-pointer">
            <span className="font-bold text-3xl text-blue-600">Harvest</span>
            <span className="font-bold text-2xl text-sky-600">Hub</span>
          </h1>
        </Link>

        {currentUser && currentUser.role == "Admin" ? (
          <div className="flex items-center">
            <div className="text-3xl mr-80">
              Welcome {currentUser.username}
            </div>
            <div className="flex flex-col justify-center items-center ml-60">
                    <img src={user_image} alt="" width="25px" />
                    <p>{currentUser.username}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-16">
            <ul className="flex gap-4">
              <Link to="/Market">
                <li className="text-slate-700 hover:underline font-semibold text-lg">
                  Market
                </li>
              </Link>

              <Link to="/About">
                <li className="text-slate-700 hover:underline font-semibold text-lg">
                  About
                </li>
              </Link>

              <Link to="/Schemes">
                <li className="text-slate-700 hover:underline font-semibold text-lg">
                  Schemes
                </li>
              </Link>

              {currentUser==null && <Link to="/Articles">
                <li className="text-slate-700 hover:underline font-semibold text-lg">
                  Articles
                </li>
              </Link>}

              {currentUser && currentUser.role=="Customer"?<Link to="/Articles">
                <li className="text-slate-700 hover:underline font-semibold text-lg">
                  Articles
                </li>
              </Link> :
              <li className="text-slate-700 hover:underline font-semibold text-lg">
                  <a href="/sell.html">Sell</a>
                </li>
              }
                

              <Link to="/">
                <li className="text-slate-700 hover:underline font-semibold text-lg">
                  Home
                </li>
              </Link>
            </ul>

            <SearchBar />

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
              <Link to="/profile">
                {currentUser ? (
                  // <img
                  //   className='rounded-full h-7 w-7 object-cover'
                  //   src={currentUser.avatar}
                  //   alt='profile'
                  // />
                  <div className="flex flex-col justify-center items-center -ml-4">
                    <img src={user_image} alt="" width="25px" />
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
          </div>
        )}

        {currentUser ? (
          <div
            className="bg-blue-500 p-1 px-3 border-blue-600 border-2 rounded-3xl cursor-pointer hover:bg-blue-400"
            onClick={logout}
          >
            Logout
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};
