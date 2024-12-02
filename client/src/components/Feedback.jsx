import { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    message: "",
    customerSatisfaction: "",
    isWebsiteUseful: "",
    productFeedback: "",
    overallRating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/feedback/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          message: "",
          customerSatisfaction: "",
          isWebsiteUseful: "",
          productFeedback: "",
          overallRating: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting feedback.");
    }
  };

  return (
    <div className="feedback-form-container">
      <h2 className="font-semibold text-blue-700">Get in Touch With us</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <div className="row-inputs">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex gap-36">
          <div className="flex flex-col items-center gap-3">
            <label>Customer Satisfaction:</label>
            <select
              name="customerSatisfaction"
              value={formData.customerSatisfaction}
              onChange={handleChange}
              required
              className="w-44 "
            >
              <option value="">--Select--</option>
              <option value="Happy">😊 Happy</option>
              <option value="Neutral">😐 Neutral</option>
              <option value="Sad">☹️ Sad</option>
            </select>
          </div>
          <div className="flex flex-col items-center gap-3">
            <label>Is Website Useful?</label>
            <select
              name="isWebsiteUseful"
              value={formData.isWebsiteUseful}
              onChange={handleChange}
              required
              className="w-44 "
            >
              <option value="">--Select--</option>
              <option value="Yes">👍 Yes</option>
              <option value="No">👎 No</option>
            </select>
          </div>
          <div className="flex flex-col items-center gap-3">
            <label>Product Feedback:</label>
            <select
              name="productFeedback"
              value={formData.productFeedback}
              onChange={handleChange}
              required
              className="w-44 "
            >
              <option value="">--Select--</option>
              <option value="Good">Good 😊</option>
              <option value="Bad">Bad ☹️</option>
              <option value="Ok">Ok 😐</option>
              <option value="Excellent">Excellent 😍</option>
            </select>
          </div>
          <div className="flex flex-col items-center gap-3">
            <label>Overall Website Rating:</label>
            <input
              type="number"
              name="overallRating"
              min="1"
              max="5"
              value={formData.overallRating}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Feedback;
