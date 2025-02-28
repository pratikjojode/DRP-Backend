const User = require("../models/User");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/emailSender");

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    // Send welcome email with enhanced template
    await sendEmail(
      email,
      "Welcome to Our Platform!",
      `Hi ${name}, welcome to our platform!`,
      `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                background-color: #f7f9fc;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 85%;
                max-width: 800px;
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
                font-size: 28px;
                margin: 0;
                font-weight: 600;
              }
              .section {
                margin-bottom: 20px;
                padding: 15px;
                border: 1px solid #eee;
                border-radius: 8px;
                background-color: #fafafa;
              }
              .section h3 {
                color: #333;
                margin-bottom: 8px;
                font-weight: 600;
              }
              .section p {
                color: #666;
                font-size: 15px;
                line-height: 1.6;
                margin: 5px 0;
              }
              .cta-button {
                display: inline-block;
                background-color: #0066cc;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 25px;
                border-radius: 5px;
                text-align: center;
                font-size: 16px;
                margin-top: 20px;
                transition: background-color 0.3s ease;
              }
              .cta-button:hover {
                background-color: #005bb5;
              }
              .footer {
                padding: 15px;
                font-size: 13px;
                color: #999;
                text-align: center;
                background-color: #f7f9fc;
                border-radius: 0 0 10px 10px;
              }
              .footer p {
                margin: 0;
              }
              .footer a {
                color: #0066cc;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Welcome to Our Platform, ${name}!</h2>
              </div>
              <div class="section">
                <h3>We're Excited to Have You Onboard</h3>
                <p>Hi ${name},</p>
                <p>Thank you for joining us! We are thrilled to welcome you to our platform. You're now part of a vibrant community that strives for growth and success. We can't wait to see what you'll achieve!</p>
              </div>
              <div class="section">
                <h3>Your Account Details</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Role:</strong> User</p>
              </div>
              <a href="https://yourplatform.com/dashboard" class="cta-button">Go to Dashboard</a>
              <div class="footer">
                <p>If you have any questions, feel free to <a href="mailto:support@yourplatform.com">contact us</a>.</p>
                <p>Thank you for being a part of our journey!</p>
              </div>
            </div>
          </body>
        </html>
      ` // HTML body
    );

    // Send response
    res.status(201).json({
      message: "User registered successfully and email sent.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
