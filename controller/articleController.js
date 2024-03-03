const Article = require("../model/articleSchema");

// Controller function to create a new article
exports.createArticle = async (req, res) => {
  try {
    const { userId, title, content, savedType } = req.body;

    const article = new Article({
      userId,
      title,
      content,
      likes: 0,
      status: "pending",
      savedType,
    });

    await article.save();

    res.status(201).json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to retrieve all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("userId", "name email");
    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get articles by writerId
exports.getArticlesByWriterId = async (req, res) => {
  try {
    const { writerId } = req.params;
    const articles = await Article.find({ userId: writerId }).populate(
      "userId",
      "name email"
    );
    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get a single article by its ID
exports.getArticleById = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).populate(
      "userId",
      "name email"
    );
    if (!article) {
      return res
        .status(404)
        .json({ success: false, error: "Article not found" });
    }
    res.status(200).json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to update an existing article
exports.updateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      req.body,
      { new: true }
    );
    if (!updatedArticle) {
      return res
        .status(404)
        .json({ success: false, error: "Article not found" });
    }
    res.status(200).json({ success: true, article: updatedArticle });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res
        .status(404)
        .json({ success: false, error: "Article not found" });
    }
    res.status(200).json({ success: true, article: deletedArticle });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
