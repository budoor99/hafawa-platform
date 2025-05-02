const nodemailer = require("nodemailer");

exports.sendEmailToUser = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Hafawa Admin" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      text: message,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};
