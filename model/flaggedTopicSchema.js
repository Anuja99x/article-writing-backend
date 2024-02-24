const mongoose = require('mongoose');

const flaggedTopicSchema = new mongoose.Schema({
    flaggedTopicId: { type: String, required: true }, // Add flaggedTopicId field
    topicId: { type: String, required: true },
    topicName: { type: String, required: true },
    flaggedBy: { type: String, required: true }, // You can specify the user who flagged the topic
    reason: { type: String, required: true }// You can specify the reason why the topic was flagged
    //createdAt: { type: Date, default: Date.now() }
    
},{ collection: 'flagged_Topics' }
);

module.exports = mongoose.model('FlaggedTopic', flaggedTopicSchema);
