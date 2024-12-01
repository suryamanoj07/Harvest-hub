import { useEffect, useState } from 'react';
import './FeedbackList.css';
import { Sidebar } from "../components/Sidebar";


function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/feedback/get');
        const data = await response.json();
        setFeedbacks(data.reverse());
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
   
    <div>
      <Sidebar/>
      <div className="feedback-list-container ml-40">
      <h2 className="feedback-list-title">All Feedbacks</h2>
      <div className="feedback-cards ml-8 mt-6">
        {feedbacks.map((feedback) => (
          <div className="feedback-card" key={feedback._id}>
            <h3 className="feedback-card-name">{feedback.name}</h3>
            <p className="feedback-card-message">
              <strong>{feedback.message}</strong>
            </p>
            {expandedCard === feedback._id ? (
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
                <button className="toggle-button" onClick={() => toggleExpand(feedback._id)}>Show Less</button>
              </div>
            ) : (
              <button className="toggle-button" onClick={() => toggleExpand(feedback._id)}>Show More</button>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
}

export default FeedbackList;
