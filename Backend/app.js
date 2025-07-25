const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
 
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const UserRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes");
const ViewRoutes = require("./routes/like.route");
const LikeRoutes = require("./routes/views.route");
const CommentRoutes = require("./routes/comment.routes");
const EmailRoutes = require("./routes/email.routes");


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/users", UserRoutes);
app.use("/posts", PostRoutes);
app.use("/:postId", ViewRoutes, LikeRoutes, CommentRoutes);
app.use("/email", EmailRoutes);


module.exports = app;
