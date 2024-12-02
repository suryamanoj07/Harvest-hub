import Feedback from "../models/feedback.js";

const feedbackSubmit =  async (req, res) => {
  try {
    const {
      name, email, phone, city, state, message,
      customerSatisfaction, isWebsiteUseful, productFeedback, overallRating,
    } = req.body;

    if (
      !name || !email || !phone || !city || !state || !message ||
      !customerSatisfaction || !isWebsiteUseful || !productFeedback || !overallRating
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const feedback = new Feedback({
      name,
      email,
      phone,
      city,
      state,
      message,
      customerSatisfaction,
      isWebsiteUseful,
      productFeedback,
      overallRating,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
};

const getfeedbacks =  async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};



export { feedbackSubmit, getfeedbacks };
