/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import { LoginPopup } from "../components/LoginPopup";
import background from "./../../assets/website-home.jpg";
import { Products } from "./Products";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import FoodItem from "../components/FoodItem";
import Feedback from "../components/Feedback";

const scrollContainer = (scrollOffset) => {
  const container = document.getElementById("scroll-container");
  container.scrollLeft += scrollOffset;
};

const scrollContainer2 = (scrollOffset) => {
  const container = document.getElementById("scroll-container2");
  container.scrollLeft += scrollOffset;
};

export const Home = ({ category, setCategory }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [fastSellingItems, setFastSellingItems] = useState([]);
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const [fastSellingTools, setFastSellingTools] = useState([]);
  const [newlyAddedTools, setNewlyAddedTools] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.role === "Admin") {
      navigate("/orders");
    } else {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser && currentUser.role === "Customer") {
      fetchFastSellingItems();
      fetchNewlyAddedProducts();
    }
    if (currentUser && currentUser.role === "Farmer") {
      fetchFastSellingTools();
      fetchNewlyAddedTools();
    }
  }, [currentUser]);

  const fetchFastSellingItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/topselling"
      );
      setFastSellingItems(response.data.message);
    } catch (error) {
      console.error("Error fetching fast-selling items:", error);
    }
  };

  const fetchNewlyAddedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/recentadded"
      );
      setNewlyAddedProducts(response.data.message);
    } catch (error) {
      console.error("Error fetching newly added products:", error);
    }
  };

  const fetchFastSellingTools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tool/topselling"
      );
      setFastSellingTools(response.data.message);
    } catch (error) {
      console.error("Error fetching fast-selling items:", error);
    }
  };

  const fetchNewlyAddedTools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tool/recentadded"
      );
      setNewlyAddedTools(response.data.message);
    } catch (error) {
      console.error("Error fetching newly added products:", error);
    }
  };

  return (
    <div className="main-container">
      <div
        className="bg-cover bg-center flex flex-col"
        style={{ backgroundImage: `url(${background})`, height: "100vh" }}
      >
        <div className="text-white text-6xl font-bold relative ml-8 mt-80 p-8">
          <h1 className="max-w-xl">
            We bridge the gap between local farms & your doorstep, with no
            middlemen
          </h1>
        </div>
        <div className="mt-28 mx-20 px-8">
          {currentUser == null && <LoginPopup />}
        </div>

        {/* Only show products for customers */}
        {currentUser && currentUser.role === "Customer" && (
          <>
            <div className="mx-20 p-8 relative gradient mb-10">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Fast Selling Products</h2>
                <Link to="/Market">
                  <p className="mr-4 mt-2 mb-2 font-bold hover:underline cursor-pointer text-white p-1 rounded-lg text-sm bg-cyan-500">
                    View all
                  </p>
                </Link>
              </div>

              {/* Left Arrow */}
              <button
                className="scroll-arrow left-arrow"
                onClick={() => scrollContainer(-200)} // Scroll left by 200px
              >
                &#10094;
              </button>

              {/* Horizontal scroll container */}
              <div id="scroll-container" className="horizontal-scroll-container">
                {fastSellingItems.map((item) => (
                  <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stockQuantity}
                    role="Customer"
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="scroll-arrow right-arrow"
                onClick={() => scrollContainer(200)} // Scroll right by 200px
              >
                &#10095;
              </button>
            </div>
            <div className="mx-20 p-8 relative gradient mb-10">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Recently Added Products</h2>
                <Link to="/Market">
                  <p className="mr-4 mt-2 mb-2 font-bold hover:underline cursor-pointer text-white p-1 rounded-lg text-sm bg-cyan-500">
                    View all
                  </p>
                </Link>
              </div>

              {/* Left Arrow */}
              <button
                className="scroll-arrow left-arrow"
                onClick={() => scrollContainer2(-200)} // Scroll left by 200px
              >
                &#10094;
              </button>

              {/* Horizontal scroll container */}
              <div id="scroll-container2" className="horizontal-scroll-container">
                {newlyAddedProducts.map((item) => (
                  <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stockQuantity}
                    role="Customer"
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="scroll-arrow right-arrow"
                onClick={() => scrollContainer2(200)} // Scroll right by 200px
              >
                &#10095;
              </button>
            </div>
            {currentUser && currentUser.role === "Customer" && <Feedback />}
          </>
        )}

        {currentUser && currentUser.role === "Farmer" && (
          <>
            <div className="mx-20 p-8 relative gradient mb-10">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Fast Selling Tools</h2>
                <Link to="/Market">
                  <p className="mr-4 mt-2 mb-2 font-bold hover:underline cursor-pointer text-white p-1 rounded-lg text-sm bg-blue-600">
                    View all
                  </p>
                </Link>
              </div>

              {/* Left Arrow */}
              <button
                className="scroll-arrow left-arrow"
                onClick={() => scrollContainer(-200)} // Scroll left by 200px
              >
                &#10094;
              </button>

              {/* Horizontal scroll container */}
              <div id="scroll-container" className="horizontal-scroll-container">
                {fastSellingTools.map((item) => (
                  <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stockQuantity}
                    role="Farmer"
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="scroll-arrow right-arrow"
                onClick={() => scrollContainer(200)} // Scroll right by 200px
              >
                &#10095;
              </button>
            </div>
            <div className="mx-20 p-8 relative gradient mb-10">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Recently Added Tools</h2>
                <Link to="/Market">
                  <p className="mr-4 mt-2 mb-2 font-bold hover:underline cursor-pointer text-white p-1 rounded-lg text-sm bg-blue-600">
                    View all
                  </p>
                </Link>
              </div>

              {/* Left Arrow */}
              <button
                className="scroll-arrow left-arrow"
                onClick={() => scrollContainer2(-200)} // Scroll left by 200px
              >
                &#10094;
              </button>

              {/* Horizontal scroll container */}
              <div id="scroll-container2" className="horizontal-scroll-container">
                {newlyAddedTools.map((item) => (
                  <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stockQuantity}
                    role="Customer"
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="scroll-arrow right-arrow"
                onClick={() => scrollContainer2(200)} // Scroll right by 200px
              >
                &#10095;
              </button>
            </div>
            {currentUser && currentUser.role === "Farmer" && <Feedback />}
          </>
        )}
      </div>
    </div>
  );
};