const express = require("express");
const {
  submitFeedback,
  getFeedbacks,
  deleteFeedback,
  updateFeedback,
  approveFeedback,
  getFeedbackStats,
} = require("../controllers/feedbackController");
const router = express.Router();

router.post("/feedback", submitFeedback);

router.get("/getFeedback", getFeedbacks);

router.delete("/deleteFeedback/:id", deleteFeedback);
router.put("/updateFeedback/:id", updateFeedback);

router.put("/approveFeedback/:id", approveFeedback);

router.get("/feedback-stats", getFeedbackStats);
module.exports = router;
