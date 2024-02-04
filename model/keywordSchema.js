const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    keywordId: { type: String, unique: true },
    topicDomainId: { type: String, required: true },
    keywordName: { type: String, required: true },
    description: String,
},{ collection: 'keywords_for_topics' }
);

// Middleware to generate unique keywordId before saving
keywordSchema.pre('save', async function(next) {
    try {
        const count = await this.constructor.countDocuments();
        this.keywordId = `keyword-${count + 1}`;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Keyword', keywordSchema);
