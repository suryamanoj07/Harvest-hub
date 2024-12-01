import farmer from "./../../assets/farmer-login.jpg";
import admin from "./../../assets/admin-login.jpg";
// import restaurant from "./../../assets/reataurant-login.jpg";
import { Link } from "react-router-dom";

export const LoginPopup = () => {
  return (
    <div className="mb-4">
      <span className="bg-blue-600 text-black font-bold  mx-20 text-3xl p-4">
        Choose Your Login
      </span>
      <div className="flex gap-20 border-blue-600 border-4 rounded-lg p-4 bg-blue-200 max-w-full mr-96">
        <Link to="/Login">
        <div className="relative group w-52 h-64 mt-10 ml-10 cursor-pointer">
          <img
            src={farmer}
            className="bg-center bg-cover h-52 w-52 object-cover transition-opacity duration-300 group-hover:opacity-50"
          />
          <div className=" h-52 w-52 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
            <p className="text-lg font-bold">Farmer</p>
          </div>
        </div>
        </Link>
        <Link to="/Login">
        <div className="relative group w52 h-64 mt-10 cursor-pointer">
          <img
            src="https://etimg.etb2bimg.com/photo/97997286.cms"
            className="bg-center bg-cover h-52 w-52 object-cover transition-opacity duration-300 group-hover:opacity-50"
          />
          <div className=" h-52 w-52 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
            <p className="text-lg font-bold">Customer</p>
          </div>
        </div>
        </Link>
        {/* <div className="relative group w-52 h-64 mt-10 cursor-pointer">
          <img
            src={restaurant}
            className="bg-center bg-contain h-52 w-52 object-cover transition-opacity duration-300 group-hover:opacity-50"
          />
          <div className=" h-52 w-52 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
            <p className="text-lg font-bold">Restaurants</p>
          </div>
        </div> */}
        <Link to="/Login">
        <div className="relative group w-52 h-64 mt-10 cursor-pointer">
          <img
            src={admin}
            className="bg-center bg-cover h-52 w-52 object-cover transition-opacity duration-300 group-hover:opacity-50"
          />
          <div className=" h-52 w-52 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
            <p className="text-lg font-bold">Admin</p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};
