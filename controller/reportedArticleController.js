const ReportedArticle = require('../model/reportedArticleSchema')

const saveReported=(req,resp)=>{
    const reportData = new ReportedArticle({
       reportId:req.body.reportId,
       reporterName:req.body.reporterName,
       reportedReason:req.body.reportedReason,
       time:req.body.time,
       articleId:req.body.articleId,
       writerId:req.body.writerId,
    });
    reportData.save().then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const getUniqueReportedArticleIds = async (req, res) => {
    try {
        const uniqueReportedArticle = await ReportedArticle.aggregate([
            {
                $group: {
                    _id: "$articleId", // Group by articleId
                    articleId: { $first: "$articleId" },
                    count: { $sum: 1 },
                    reasons: { $push: "$reportedReason" } 
                }
            }
        ]);

        res.status(200).json(uniqueReportedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    saveReported,
    getUniqueReportedArticleIds
};
