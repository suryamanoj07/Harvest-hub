import express from 'express';
import { feedbackSubmit, getfeedbacks } from '../controllers/feedback.js';

const feedbackRouter = express.Router();

feedbackRouter.post("/submit",feedbackSubmit);
feedbackRouter.get("/get",getfeedbacks)


export default feedbackRouter;