/* eslint-disable react/prop-types */
// import axios from "axios";
import "./Products.css";
import { useContext, useState } from "react";
import FoodItem from "../components/FoodItem";
import { storeContext } from "./redux/context/storeContext";
import { useSelector } from "react-redux";
import ExploreMenu from "../components/ExploreMenu";

export const Products = ({ category, setCategory }) => {
  const { food_list, tool_list } = useContext(storeContext);
  const { currentUser } = useSelector((state) => state.user);

  // const [loading, setLoading] = useState(true); // Add a loading state
  const [sortOption, setSortOption] = useState("");

  const sortProducts = (products) => {
    if (sortOption === "priceHighToLow") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    if (sortOption === "priceLowToHigh") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortOption === "fastSelling") {
      return [...products].sort((a, b) => a.stockQuantity - b.stockQuantity);
    }
    if (sortOption === "recentlyAdded") {
      return [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Assuming `createdAt` is a field
    }
    return products;
  };

  const getFilteredProducts = (products) => {
    const filteredProducts = products.filter(
      (item) => category === "All" || category === item.category
    );
    return sortProducts(filteredProducts);
  };

  return (
    <div className="">
      <div className="products-header ml-8">
        <ExploreMenu category={category} setCategory={setCategory} />
        <select
          className="filter-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="fastSelling">Fast Selling</option>
          <option value="recentlyAdded">Recently Added</option>
        </select>
      </div>
      <div className="food-display" id="food-dsiplay">
        <div className="food-display-list">
          {currentUser == null && <p>login to see the products</p>}

          {currentUser &&
            currentUser.role === "Customer" &&
            getFilteredProducts(food_list).map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stockQuantity}
                  />
                );
              }
              return null;
            })}
          {currentUser &&
            currentUser.role === "Farmer" &&
            getFilteredProducts(tool_list).map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stockQuantity}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};
