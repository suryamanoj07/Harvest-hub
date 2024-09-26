// import React from 'react'
import { Link } from "react-router-dom"
import under_con from "./../../assets/under_con.png"

export const About = () => {
  return (
    <div className=" mx-40 flex mt-40 justify-evenly items-center">
      <div>
        <img src={under_con} alt="" className="h-96" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-semibold">Currently Unavailable </h1>
        <p>
          We are glad you visted us and thank you. Now return to home page
        </p>
        <Link to="/Market">
          <button className="bg-blue-400 p-3 rounded-lg hover:opacity-90">
            HOME
          </button>
        </Link>
      </div>
    </div>
  )
}
