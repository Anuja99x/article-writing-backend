const Approval = require("../model/articleApprovalSchema");
const uuid = require("uuid");

const saveApproval = (req, resp) => {
  const approvalDto = new Approval({
    approvalId: uuid.v4(),
    adminId: req.body.adminId,
    articleId: req.body.articleId,
    approvedAt: new Date(),
  });
  approvalDto
    .save()
    .then((result) => {
      resp.status(201).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const getApprovalByArticleId = (req, resp) => {
  Approval.findOne({ articleId: req.params.id })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const getApprovalHistory = (req, resp) => {
  const agg = [
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "articleId",
        as: "article",
      },
    },
    {
      $lookup: {
        from: "userData",
        localField: "adminId",
        foreignField: "userId",
        as: "admin",
      },
    },
    {
      $unwind: "$admin",
    },
    {
      $lookup: {
        from: "userData",
        localField: "article.userId",
        foreignField: "userId",
        as: "writer",
      },
    },
    {
      $unwind: "$article",
    },
    {
      $unwind: "$writer",
    },
    {
      $project: {
        _id: 0,
        adminId: 1,
        articleId: 1,
        "admin.name": 1,
        "article.title": 1,
        "writer.name": 1,
        "writer.userId": 1,
        approvedAt: 1,
      },
    },
    {
      $sort: {
        approvedAt: -1,
      },
    },
  ];

  Approval.aggregate(agg)
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

module.exports = {
  saveApproval,
  getApprovalByArticleId,
  getApprovalHistory,
};
