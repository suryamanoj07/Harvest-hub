import express from 'express';
import { feedbackSubmit } from '../controllers/feedback.js';

const feedbackRouter = express.Router();

feedbackRouter.post("/submit",feedbackSubmit);


export default feedbackRouter;