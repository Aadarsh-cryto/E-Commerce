const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyEmail = async (token, email) => {
  const verificationLink = `http://localhost:5173/verify?token=${token}`;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify Your Email",

      html: `
      <div style="font-family:Arial,sans-serif;padding:30px">

        <h2>Email Verification</h2>

        <p>Thank you for registering.</p>

        <p>
        Click the button below to verify your email address.
        </p>

        <a
        href="${verificationLink}"
        style="
        background:#2563eb;
        color:#ffffff;
        padding:12px 22px;
        text-decoration:none;
        border-radius:6px;
        display:inline-block;
        margin-top:10px;
        ">
        Verify Email
        </a>

        <p style="margin-top:20px">
        This verification link will expire in 10 minutes.
        </p>

      </div>
      `,
    };

    await transporter.sendMail(mailConfigurations);

    console.log("Verification Email Sent Successfully.");
  } catch (error) {
    console.log("Mail Error:", error.message);
    throw error;
  }
};

module.exports = {
  verifyEmail,
};