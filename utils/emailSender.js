const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  try {
    console.log("🟢 Sending email to:", to);

    let transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: 465, // Secure SSL port
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Your Zoho email
        pass: process.env.EMAIL_PASS, // Your App Password (Not regular password)
      },
    });

    let mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`, // ✅ Add sender name
      to, // ✅ Recipient email (user email)
      subject,
      text,
      html,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message, error);
  }
};

module.exports = sendEmail;
