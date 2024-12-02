/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './FeedbackCard.css';

function FeedbackCard({ feedback }) {
  return (
    <div className="feedback-card">
      <h3 className="feedback-card-name">{feedback.name}</h3>
      <p className="feedback-card-message">
        <strong>{feedback.message}</strong>
      </p>
      <div className="feedback-card-details">
        <p><strong>Email:</strong> {feedback.email}</p>
        <p><strong>Phone:</strong> {feedback.phone}</p>
        <p><strong>City:</strong> {feedback.city}</p>
        <p><strong>State:</strong> {feedback.state}</p>
        <p><strong>Customer Satisfaction:</strong> {feedback.customerSatisfaction}</p>
        <p><strong>Is Website Useful:</strong> {feedback.isWebsiteUseful}</p>
        <p><strong>Product Feedback:</strong> {feedback.productFeedback}</p>
        <p><strong>Overall Rating:</strong> {feedback.overallRating}</p>
        <p><strong>Submitted At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default FeedbackCard;
