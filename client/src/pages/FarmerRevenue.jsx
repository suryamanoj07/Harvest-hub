/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FarmerRevenue.css";
import { useSelector } from "react-redux";

const FarmerRevenue = () => {
  const { currentUser } = useSelector((state) => state.user);
  const email = currentUser.email;

  const [soldProducts, setSoldProducts] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);

  // Filter options
  const filters = [
    { label: "Last 30 Minutes", value: "30min" },
    { label: "Last 2 Hours", value: "2hrs" },
    { label: "Last Day", value: "1day" },
    { label: "Last Week", value: "1week" },
    { label: "Overall", value: "overall" }
  ];

  // Fetch revenue based on the selected filter
  const fetchRevenue = async (filterValue) => {
    try {
      const response = await axios.post("http://localhost:3000/api/product/farmerrevenue", {
        email,
        filter: filterValue
      });

      if (response.data.success) {
        setSoldProducts(response.data.soldProducts);
        setRevenue(response.data.revenue);
        setTotalItemsSold(response.data.totalItemsSold);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching revenue data.");
    }
  };

  useEffect(() => {
    // Fetch overall data initially
    fetchRevenue("overall");
  }, [email]);

  return (
    <div className="revenue-container">
      <h2>Your Revenue Dashboard</h2>

      <div className="filter-section">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => fetchRevenue(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="revenue-summary">
        <h3>Total Revenue: Rs {revenue}/-</h3>
        <p>Total Items Sold: {totalItemsSold}</p>
      </div>

      {soldProducts.length === 0 ? (
        <div className="no-products-message">
          No products sold during this period.
        </div>
      ) : (
        <div className="sold-products-list">
          {soldProducts.map((product) => (
            <div key={product._id} className="sold-product-card">
              <img
                src={`http://localhost:3000/images/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> Rs {product.price}/-</p>
              <p><strong>Stock Remaining:</strong> {product.stockQuantity} items</p>
              <p><strong>Status:</strong> {product.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerRevenue;
