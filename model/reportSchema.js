const mongoose = require('mongoose');
const reportCommentSchema = new mongoose.Schema({
    reportId:{type: String, unique: true},
    reporterName:{type: String, require: true},
    reportedReason:{type: String, require: true},
    time:{type: Date, require: true,default: Date.now},
    articleId:{type: String, require: true},
    writerId:{type: String, require: true},
},{ collection: 'reportedData' });


module.exports = mongoose.model('ReportedArticle', reportCommentSchema);