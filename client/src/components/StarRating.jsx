/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./StarRating.css"; // Create a CSS file for styling

const StarRating = ({ productId, userId, initialRating = 0 }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleRatingSubmit = async (rating) => {
    try {
      const response = await fetch("http://localhost:3000/api/product/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId, rating }),
      });
      const data = await response.json();
      if (data.success) {
        setSelectedRating(rating);
        alert("Rating submitted successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${hoverRating >= star || selectedRating >= star ? "filled" : ""}`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleRatingSubmit(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
