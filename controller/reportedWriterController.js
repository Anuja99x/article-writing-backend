const ReportedWriter = require('../model/reportedWriterSchema')

const saveReportedWriters =(req,resp)=>{
    const reportWriterData = new ReportedWriter({
       reportId:req.body.reportId,
       reporterName:req.body.reporterName,
       reportedReason:req.body.reportedReason,
       time:req.body.time,
       writerId:req.body.writerId,
    });
    reportWriterData.save().then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const getUniqueReportedWriterIds = async (req, res) => {
    try {
        const uniqueReportedWriters = await ReportedWriter.aggregate([
            {
                $group: {
                    _id: "$writerId", // Group by writerId
                    writerId: { $first: "$writerId" },
                    count: { $sum: 1 },
                    reasons: { $push: "$reportedReason" } 
                }
            }
        ]);

        res.status(200).json(uniqueReportedWriters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    saveReportedWriters,
    getUniqueReportedWriterIds
};
