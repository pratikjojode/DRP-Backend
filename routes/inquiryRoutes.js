const express = require("express");
const router = express.Router();
const {
  submitInquiry,
  submitCourseInquiry,
  submitBasicInquiry,
  drpFormController,
  contactFormController,
  formController,
  coubsellingFormController,
} = require("../controllers/inquiryController");

router.post("/inquiry", submitInquiry);
router.post("/basicinquiry", submitBasicInquiry);

router.post("/course-inquiry", submitCourseInquiry);

router.post("/submit-form-drp", drpFormController);
router.post("/contact-form-drp-register", contactFormController);
router.post("/form", formController);
router.post("/counsellingform", coubsellingFormController);
module.exports = router;
