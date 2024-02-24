const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    keywordId: { type: String, unique: true },
    topicDomainId: { type: String, required: true },
    keywordName: { type: String, required: true },
    description: String,
},{ collection: 'keywords_for_topics' }
);

// Middleware to generate unique keywordId before saving


module.exports = mongoose.model('Keyword', keywordSchema);
