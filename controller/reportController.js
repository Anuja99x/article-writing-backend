const ReportedArticle = require('../model/reportSchema')

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

module.exports = {
    saveReported
};
