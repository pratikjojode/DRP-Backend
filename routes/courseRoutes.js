const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  upload,
} = require("../controllers/courseController");

// Create a new course with image upload (admin only)
router.post(
  "/createcourse",
  protect,
  admin,
  upload.single("image"),
  createCourse
);

// Get all courses (public)
router.get("/courses", getAllCourses);

// Get a course by ID (public)
router.get("/courses/:id", getCourseById);

// Update a course by ID with image upload (admin only)
router.put(
  "/admin/updatecourses/:id",
  protect,
  admin,
  upload.single("image"),
  updateCourse
);

// Delete a course by ID (admin only)
router.delete("/admin/deletecourses/:id", protect, admin, deleteCourse);

module.exports = router;
