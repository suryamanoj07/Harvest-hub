// import React from 'react'
// import { useState } from "react"
import { useContext } from "react";
import {FaSearch} from "react-icons/fa"
import { storeContext } from "../pages/redux/context/storeContext";

export const SearchBar = () => {
    const { input,setInput } = useContext(storeContext);
 
    const fetchData = async(value) => {
        
    }
    
  return (
    <form className="bg-slate-100 p-3 rounded-lg flex items-center justify-between">
          <input
            type="text"
            placeholder="Search.."
            id="search"
            className="bg-transparent focus:outline-none w-24 sm:w-72"
            value={input} onChange={(e)=>setInput(e.target.value)}
          />
          <FaSearch className="text-slate-600 w-8 text-xl" />
    </form>
  )
}
