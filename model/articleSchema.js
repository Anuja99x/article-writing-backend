const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      // pending, approved, rejected
      default: "pending",
    },
    savedType: {
      type: String, // draft, completed
    },
  },
  { collection: "article" }
);

module.exports = mongoose.model("Article", ArticleSchema);
