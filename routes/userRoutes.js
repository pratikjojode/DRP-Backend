const express = require("express");

const router = express.Router();
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

// Protected admin route example
router.get("/admin/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

// Fetch all users (admin only)
router.get("/admin/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete user by ID (admin only)
router.delete("/admin/deleteusers/:id", protect, admin, async (req, res) => {
  try {
    const userId = req.params.id.trim();
    const user = await User.findByIdAndDelete(userId); // Delete user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
