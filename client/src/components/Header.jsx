import React, { useContext } from "react";
import { FaRegHeart, FaShoppingBag, FaBars } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeContext } from "../pages/redux/context/storeContext";
import { SearchBar } from "./SearchBar";
import user_image from "./../../assets/user_img.png";
import "./Header.css";
import { logoutSuccess } from "../pages/redux/user/userSlice";

export const Header = ({ toggleSidebar }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartQuantity, setToken } = useContext(storeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    dispatch(logoutSuccess());
    navigate("/");
  };

  return (
    <header className="bg-slate-300 shadow-md fixed top-0 left-0 w-full z-50 flex items-center p-3">
      <div className="flex items-center">
        <FaBars className="text-2xl cursor-pointer mr-4" onClick={toggleSidebar} />
        <Link to="/">
          <h1 className="cursor-pointer">
            <span className="font-bold text-3xl text-blue-600">Harvest</span>
            <span className="font-bold text-2xl text-sky-600">Hub</span>
          </h1>
        </Link>
      </div>

      <nav className="flex items-center ml-auto gap-16">
        <ul className="flex gap-4">
          <li className="text-slate-700 hover:underline font-semibold text-lg">
            <Link to="/Market">Market</Link>
          </li>
          <li className="text-slate-700 hover:underline font-semibold text-lg">
            <Link to="/About">About</Link>
          </li>
          <li className="text-slate-700 hover:underline font-semibold text-lg">
            <Link to="/Schemes">Schemes</Link>
          </li>
          {(currentUser === null || currentUser.role === "Customer") && (
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              <Link to="/Articles">Articles</Link>
            </li>
          )}
          {currentUser?.role === "Farmer" ? (
            <div className="sell-dropdown text-slate-700 font-semibold text-lg">
              <span className="cursor-pointer">Sell</span>
              <ul className="dropdown-content">
                <li><a href="/sell.html">Products</a></li>
                <li><a href="/sell2.html">Tools</a></li>
              </ul>
            </div>
          ) : (
            <li className="text-slate-700 hover:underline font-semibold text-lg">
              <Link to="/">Home</Link>
            </li>
          )}
        </ul>

        <SearchBar />

        <ul className="flex gap-6 items-center">
          <li className="font-bold flex flex-col items-center cursor-pointer">
            <FaRegHeart />
            <span>Wishlist</span>
          </li>
          <li className="flex items-center cursor-pointer">
            <Link to="/cart">
              <FaShoppingBag className="text-xl" />
              <span className="cart-quantity">{cartQuantity}</span>
            </Link>
          </li>
          {currentUser ? (
            <li className="flex flex-col items-center">
              <Link to="/profile">
                <img src={user_image} alt="User" className="w-8 h-8 rounded-full" />
                <p>{currentUser.email}</p>
              </Link>
            </li>
          ) : (
            <li className="font-bold flex flex-col items-center cursor-pointer">
              <Link to="/login">
                <IoPersonSharp className="text-xl" />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>

        {currentUser && (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-400 ml-6"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};