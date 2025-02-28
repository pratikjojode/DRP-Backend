const Feedback = require("../models/Feedback");

// Submit Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, phone, rating, subject, message } = req.body;

    if (!name || !email || !phone || !rating || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFeedback = new Feedback({
      name,
      email,
      phone,
      rating,
      subject,
      message,
    });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, rating, subject, message } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    feedback.name = name || feedback.name;
    feedback.email = email || feedback.email;
    feedback.phone = phone || feedback.phone;
    feedback.rating = rating || feedback.rating;
    feedback.subject = subject || feedback.subject;
    feedback.message = message || feedback.message;

    await feedback.save();

    res
      .status(200)
      .json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    console.error("Update Feedback Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Fetch Feedback Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all feedback
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

// Approve feedback
exports.approveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({ message: "Feedback approved successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error approving feedback", error });
  }
};

exports.getFeedbackStats = async (req, res) => {
  try {
    const totalFeedbacks = await Feedback.countDocuments();
    const approvedFeedbacks = await Feedback.countDocuments({ approved: true });
    const unapprovedFeedbacks = totalFeedbacks - approvedFeedbacks;

    const avgRatingResult = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating =
      avgRatingResult.length > 0 ? avgRatingResult[0].avgRating.toFixed(2) : 0;

    res.status(200).json({
      totalFeedbacks,
      approvedFeedbacks,
      unapprovedFeedbacks,
      avgRating,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching feedback statistics", error });
  }
};
