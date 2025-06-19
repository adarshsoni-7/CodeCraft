const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const UserRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes");


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/users", UserRoutes);
app.use("/posts", PostRoutes);

module.exports = app;
