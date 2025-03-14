const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getAllBlogsBId,
} = require("../controllers/blogController");
const { upload } = require("../config/cloudinaryConfig"); // ✅ Use Cloudinary Upload
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a blog with image upload
router.post("/", protect, upload.single("image"), createBlog);

// Admin routes
router.get("/getblogs", getAllBlogs);
router.get("/getblogs/:id", getAllBlogsBId);
router.delete("/admin/deleteblogs/:id", protect, admin, deleteBlog);
router.put(
  "/admin/updateblogs/:id",
  protect,
  admin,
  upload.single("image"),
  updateBlog
);

module.exports = router;
