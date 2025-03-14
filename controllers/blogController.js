const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");

// Create a blog with image upload
const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    console.log("Received file:", req.file);
    console.log("Request body:", req.body);

    // Normalize image path
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    // Create blog post
    const blog = await Blog.create({
      title,
      content,
      image: imagePath, // Store fixed path
      author: req.user ? req.user.id : null,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: {
        id: blog._id,
        title: blog.title,
        content: blog.content,
        image: imagePath, // No need to fix again
        author: blog.author,
      },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all blogs (admin only)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email"); // Include author details
    res.status(200).json({
      message: "Fetched blogs successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a blog (admin only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog deleted successfully",
      data: {
        id: blog._id,
        title: blog.title,
        content: blog.content,
        image: blog.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, image, author } = req.body;

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Optional: Check if the logged-in user is the author or an admin
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" });
    }

    // Update the blog fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.author = author || blog.author;
    // Handle image upload if new image is provided
    if (req.file) {
      blog.image = req.file.path; // Store the path of the uploaded image
    }

    // Save the updated blog
    const updatedBlog = await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllBlogsBId = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
      });
    }

    // Fetch the blog with populated author details
    const blog = await Blog.findById(blogId)
      .populate("author", "name email") // Populate author data (name, email)
      .exec();

    // If blog not found
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found based on id",
      });
    }

    // Return the blog data with author details
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBlogs,
  deleteBlog,
  createBlog,
  updateBlog,
  getAllBlogsBId,
};
