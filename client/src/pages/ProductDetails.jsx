/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
          setReviews(data.product.reviews);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id, userId: "currentUserId", comment }),
      });
      const data = await response.json();
      if (data.success) {
        setReviews([...reviews, { user: "currentUserId", comment }]);
        setComment("");
        alert("Review added successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={`http://localhost:3000/images/${product.image}`} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: Rs. {product.price}/-</p>
      <StarRating productId={id} userId="currentUserId" initialRating={product.ratings.averageRating} />

      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.comment}</p>
        </div>
      ))}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a review..."
      />
      <button onClick={handleReviewSubmit}>Submit Review</button>
    </div>
  );
};

export default ProductDetails;
