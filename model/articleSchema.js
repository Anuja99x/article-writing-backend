const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: false,
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
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      require: true, // pending, approved, rejected
      default: "pending",
    },
    savedType: {
      type: String, // draft, completed
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
