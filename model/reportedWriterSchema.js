const mongoose = require('mongoose');
const reportedWriterSchema = new mongoose.Schema({
    reportId:{type: String, unique: true},
    reporterName:{type: String, require: true},
    reportedReason:{type: String, require: true},
    time:{type: Date, require: true,default: Date.now},
    writerId:{type: String, require: true},
},{ collection: 'reportedWriters' });


module.exports = mongoose.model('ReportedWriter', reportedWriterSchema);