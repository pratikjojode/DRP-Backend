const nodemailer = require("nodemailer");

const submitInquiry = async (req, res) => {
  const {
    name,
    email,
    message,
    courseName,
    contact,
    educationLevel,
    universityName,
    inquiryType,
    preferredContactMethod,
    preferredTime,
    city,
    country,
    referralSource,
  } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Inquiry",
      html: `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Poppins', sans-serif; background-color: rgb(192, 207, 230); margin: 0; padding: 0; }
              .container { width: 85%; max-width: 800px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
              .header { background-color: #0066cc; color: #ffffff; padding: 15px; border-radius: 10px 10px 0 0; text-align: center; }
              .header h2 { font-size: 28px; margin: 0; }
              .section { margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 8px; background-color: #fafafa; }
              .section h3 { color: #333; margin-bottom: 8px; }
              .section p { color: #666; font-size: 15px; line-height: 1.6; margin: 5px 0; }
              .cta-button { display: inline-block; background-color: #0066cc; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; text-align: center; font-size: 16px; margin-top: 20px; transition: background-color 0.3s ease; }
              .cta-button:hover { background-color: #005bb5; }
              .footer { padding: 15px; font-size: 13px; color: #999; text-align: center; background-color: #f7f9fc; border-radius: 0 0 10px 10px; }
              .footer p { margin: 0; }
              .footer a { color: #0066cc; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Course Inquiry</h2>
              </div>
              <div class="section">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> ${name || "Not provided"}</p>
                <p><strong>Email:</strong> ${email || "Not provided"}</p>
                <p><strong>Contact Number:</strong> ${
                  contact || "Not provided"
                }</p>
                <p><strong>Location:</strong> ${city || "Not provided"}, ${
        country || "Not provided"
      }</p>
              </div>
              <div class="section">
                <h3>Course and Inquiry Details</h3>
                <p><strong>Course:</strong> ${courseName || "Not provided"}</p>
                <p><strong>Message:</strong> ${message || "Not provided"}</p>
                <p><strong>Education Level:</strong> ${
                  educationLevel || "Not provided"
                }</p>
                <p><strong>University:</strong> ${
                  universityName || "Not provided"
                }</p>
                <p><strong>Inquiry Type:</strong> ${
                  inquiryType || "Not provided"
                }</p>
              </div>
              <div class="section">
                <h3>Preferred Contact</h3>
                <p><strong>Preferred Method:</strong> ${
                  preferredContactMethod || "Not provided"
                }</p>
                <p><strong>Preferred Time:</strong> ${
                  preferredTime || "Not provided"
                }</p>
              </div>
              <a href="mailto:${email}" class="cta-button">Reply to Inquiry</a>
              <div class="footer">
                <p>Thank you for your inquiry. Our team will reach out to you soon.</p>
                <p>If you have any questions, feel free to <a href="mailto:${
                  process.env.EMAIL_USER
                }">contact us</a>.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

const submitCourseInquiry = async (req, res) => {
  const { name, email, courseName, contact } = req.body;

  if (!name || !email || !courseName || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Course Inquiry from DRP systems",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f1f8ff; padding: 30px;">
          <div style="background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; text-align: center;">New Course Inquiry</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              <strong>Contact:</strong> ${contact}
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              <strong>Course:</strong> ${courseName}
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 30px; font-weight: bold; text-align: center;">
                Reply to Inquiry
              </a>
            </div>
            <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
              <p>Thank you for using our inquiry service. We will get back to you shortly.</p>
              <p>&copy; 2025 Your Company Name. All rights reserved.</p>
            </footer>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

const submitBasicInquiry = async (req, res) => {
  const { name, email, educationLevel, city, inquiryAbout, message, contact } =
    req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Inquiry",
      html: `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                background-color: rgb(192, 207, 230);
                margin: 0;
                padding: 0;
              }
              .container {
                width: 85%;
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 25px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              }
              .header {
                background-color: #0066cc;
                color: #ffffff;
                padding: 15px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h2 {
                font-size: 22px;
                margin: 0;
              }
              .section {
                margin-bottom: 15px;
                padding: 15px;
                border: 1px solid #eee;
                border-radius: 8px;
                background-color: #fafafa;
              }
              .section h3 {
                color: #333;
                margin-bottom: 8px;
              }
              .section p {
                color: #666;
                font-size: 14px;
                line-height: 1.6;
                margin: 5px 0;
              }
              .footer {
                padding: 15px;
                font-size: 12px;
                color: #999;
                text-align: center;
                background-color: #f7f9fc;
                border-radius: 0 0 10px 10px;
              }
              .footer p {
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Inquiry Received</h2>
              </div>
              <div class="section">
                <h3>Personal Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Contact Number:</strong> ${contact}</p>
                
              </div>
              <div class="section">
                <h3>Education & Inquiry</h3>
                <p><strong>Education Level:</strong> ${educationLevel}</p>
                <p><strong>Inquiry About:</strong> ${inquiryAbout}</p>
                <p><strong>Message:</strong> ${message}</p>
              </div>
              <div class="footer">
                <p>Thank you for your inquiry. We will contact you soon.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

const drpFormController = async (req, res) => {
  const { name, email, contact, message } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !contact) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a transporter using Gmail SMTP
    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "New Form Submission",
      html: `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 85%;
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 25px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #0066cc;
                color: #ffffff;
                padding: 15px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h2 {
                font-size: 22px;
                margin: 0;
              }
              .section {
                margin-bottom: 15px;
                padding: 15px;
                border: 1px solid #eee;
                border-radius: 8px;
                background-color: #fafafa;
              }
              .section h3 {
                color: #333;
                margin-bottom: 8px;
              }
              .section p {
                color: #666;
                font-size: 14px;
                line-height: 1.6;
                margin: 5px 0;
              }
              .footer {
                padding: 15px;
                font-size: 12px;
                color: #999;
                text-align: center;
                background-color: #f7f9fc;
                border-radius: 0 0 10px 10px;
              }
              .footer p {
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Form Submission</h2>
              </div>
              <div class="section">
                <h3>Personal Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact Number:</strong> ${contact}</p>
                <p><strong>Message:</strong> ${message}</p>
              </div>
              <div class="footer">
                <p>Thank you for your submission. We will contact you soon.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

const contactFormController = async (req, res) => {
  const { email, name, contact, serviceName } = req.body;

  try {
    if (!email || !name || !contact || !serviceName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Inquiry for ${serviceName}`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                background-color: #f4f7fc;
                padding: 30px;
                margin: 0;
              }
              .container {
                max-width: 600px;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                margin: auto;
                overflow: hidden;
                border: 1px solid #e0e0e0;
              }
              .header {
                background: linear-gradient(135deg, #0052cc, #003d99);
                padding: 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
              }
              .header img {
                max-width: 120px;
                margin-bottom: 10px;
              }
              .header h1 {
                color: #ffffff;
                font-size: 22px;
                margin: 0;
              }
              .content {
                padding: 25px;
                font-size: 16px;
                color: #333;
                line-height: 1.8;
              }
              .info-card {
                background: #f0f4ff;
                padding: 20px;
                border-radius: 10px;
                margin-top: 15px;
                border-left: 5px solid #0052cc;
              }
              .info-card p {
                margin: 8px 0;
                font-size: 15px;
                color: #333;
              }
              .button-container {
                text-align: center;
                margin-top: 20px;
              }
              .button {
                display: inline-block;
                padding: 12px 22px;
                background: #0052cc;
                color: #ffffff;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
                border-radius: 6px;
                transition: background 0.3s ease;
              }
              .button:hover {
                background: #0042a8;
              }
              .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                margin-top: 20px;
                padding: 15px;
                background: #f5f7fa;
                border-radius: 0 0 12px 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                
                <h1>New Inquiry for ${serviceName}</h1>
              </div>
              <div class="content">
                <p>Dear Team,</p>
                <p>A new inquiry has been received for <strong>${serviceName}</strong>. Below are the details:</p>
                <div class="info-card">
                  <p><strong>Service Name:</strong> ${serviceName}</p>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Contact:</strong> ${contact}</p>
                </div>
                <div class="button-container">
                  <a href="mailto:${email}" class="button">Reply to Inquiry</a>
                </div>
              </div>
              <div class="footer">
                <p>Thank you for using our services!</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Contact form for course registration submitted successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

// Controller for handling the contact form submission
const formController = async (req, res) => {
  const { email, name, message } = req.body;

  try {
    // Validate that all required fields are provided
    if (!email || !name || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Setup the email transporter using Zoho SMTP
    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true, // Use TLS
      auth: {
        user: process.env.EMAIL_USER, // Your Zoho email address
        pass: process.env.EMAIL_PASS, // Your Zoho app password
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email (Zoho)
      to: process.env.EMAIL_USER, // Recipient email (Zoho)
      subject: `New Message from ${name}`, // Subject of the email
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                background-color: #f4f7fc;
                padding: 30px;
                margin: 0;
              }
              .container {
                max-width: 600px;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                margin: auto;
                overflow: hidden;
                border: 1px solid #e0e0e0;
              }
              .header {
                background: linear-gradient(135deg, #0052cc, #003d99);
                padding: 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
              }
              .header h1 {
                color: #ffffff;
                font-size: 22px;
                margin: 0;
              }
              .content {
                padding: 25px;
                font-size: 16px;
                color: #333;
                line-height: 1.8;
              }
              .info-card {
                background: #f0f4ff;
                padding: 20px;
                border-radius: 10px;
                margin-top: 15px;
                border-left: 5px solid #0052cc;
              }
              .info-card p {
                margin: 8px 0;
                font-size: 15px;
                color: #333;
              }
              .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                margin-top: 20px;
                padding: 15px;
                background: #f5f7fa;
                border-radius: 0 0 12px 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Message from ${name}</h1>
              </div>
              <div class="content">
                <p>Dear Team,</p>
                <p>You have received a new message from <strong>${name}</strong>:</p>
                <div class="info-card">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
                </div>
              </div>
              <div class="footer">
                <p>Thank you for your time!</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    res.status(201).json({
      message: "Contact form submitted successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

const coubsellingFormController = async (req, res) => {
  const { email, name, message, country } = req.body;

  try {
    // Validate that all required fields are provided
    if (!email || !name || !message || !country) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Setup the email transporter using Zoho SMTP
    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465,
      secure: true, // Use TLS
      auth: {
        user: process.env.EMAIL_USER, // Your Zoho email address
        pass: process.env.EMAIL_PASS, // Your Zoho app password
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email (Zoho)
      to: process.env.EMAIL_USER, // Recipient email (Zoho)
      subject: `New Message from ${name}`, // Subject of the email
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                background-color: #f4f7fc;
                padding: 30px;
                margin: 0;
              }
              .container {
                max-width: 600px;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                margin: auto;
                overflow: hidden;
                border: 1px solid #e0e0e0;
              }
              .header {
                background: linear-gradient(135deg, #0052cc, #003d99);
                padding: 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
              }
              .header h1 {
                color: #ffffff;
                font-size: 22px;
                margin: 0;
              }
              .content {
                padding: 25px;
                font-size: 16px;
                color: #333;
                line-height: 1.8;
              }
              .info-card {
                background: #f0f4ff;
                padding: 20px;
                border-radius: 10px;
                margin-top: 15px;
                border-left: 5px solid #0052cc;
              }
              .info-card p {
                margin: 8px 0;
                font-size: 15px;
                color: #333;
              }
              .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                margin-top: 20px;
                padding: 15px;
                background: #f5f7fa;
                border-radius: 0 0 12px 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Message from ${name}</h1>
              </div>
              <div class="content">
                <p>Dear Team,</p>
                <p>You have received a new message from <strong>${name}</strong>:</p>
                <div class="info-card">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Country:</strong> ${country}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
                </div>
              </div>
              <div class="footer">
                <p>Thank you for your time!</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    res.status(201).json({
      message: "Contact form submitted successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

module.exports = {
  submitInquiry,
  submitCourseInquiry,
  submitBasicInquiry,
  drpFormController,
  contactFormController,
  formController,
  coubsellingFormController,
};
