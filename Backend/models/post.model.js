const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Hobbies",
        "Gaming",
        "Automotive",
        "Pet Care",
        "Science",
        "Work Life",
        "Social Issues",
        "Entertainment",
        "Travel & Culture",
        "Technology",
        "Lifestyle",
      ],
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assumes your user schema model is named "User"
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const PostModel =  mongoose.model("Post", postSchema);

module.exports =  PostModel;
