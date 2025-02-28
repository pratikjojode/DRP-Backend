const OurCourse = require("../models/OurCourse");
const upload = require("../utils/upload"); // Import the image upload configuration
// Get a course by ID (public)
const mongoose = require("mongoose");
// Create a new course with image upload (admin only)
const createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  // Check if an image was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image is required." });
  }

  const image = req.file.path; // Image path from multer upload

  try {
    const newCourse = new OurCourse({
      title,
      description,
      price,
      image: image.replace(/\\/g, "/"), // Corrected to use image path
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await OurCourse.find();
    res.json({ success: true, data: { courses } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await OurCourse.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a course by ID with image upload (admin only)
const updateCourse = async (req, res) => {
  const { title, description, price } = req.body;
  const image = req.file ? req.file.path : ""; // Get the updated image path

  try {
    const course = await OurCourse.findByIdAndUpdate(
      req.params.id,
      { title, description, price, image },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a course by ID (admin only)
const deleteCourse = async (req, res) => {
  try {
    const course = await OurCourse.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      message: "Course deleted successfully",
      data: {
        _id: course._id,
        title: course.title,
        description: course.description,
        price: course.price,
        image: course.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  upload,
};
