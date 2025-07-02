const transporter = require("../utils/mailer");

module.exports.subscribe = async (req, res) => {
    const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks for subscribing!",
    text: "Welcome to our inspiring and discplined platform CodeCraft, We will always notify you when there is fresh & updated content as per you need",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email." });
  }
}