/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useContext, useEffect } from "react";
import ExploreMenu from "../components/ExploreMenu";
import { LoginPopup } from "../components/LoginPopup";
import background from "./../../assets/website-home.jpg";
import { Products } from "./Products";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { storeContext } from "./redux/context/storeContext";

export const Home = ({category,setCategory}) => {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(()=>{
    if(currentUser && currentUser.role == "Admin"){
      navigate("/orders")
    }
    else navigate("/")
  },[])

  return (
    <div
      className="bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${background}) ` , height:"100vh"}}
    >
      <div className="text-white text-6xl font-bold relative ml-8 mt-80  p-8 ">
        <h1 className="max-w-xl">
          We bridge the gap between local farms & your doorstep, with no
          middlemen
        </h1>
      </div>
      <div className="mt-28 mx-20 p-8">
        {currentUser==null && <LoginPopup />}
      </div>
      {/* <ExploreMenu category={category} setCategory={setCategory}/> */}
      <div className="mb-28 mx-20 p-8">
        <Products category={category}/>
      </div>
    </div>
  );
};
