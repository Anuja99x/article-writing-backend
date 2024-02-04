const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicId: { type: String, unique: true },
    topicDomainId: { type: mongoose.Schema.Types.ObjectId, ref: 'TopicDomain', required: true },
    keywordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Keyword', required: true },
    topicName: { type: String, required: true },
    description: String,
},{ collection: 'topics_of_keywords' }
);

// Middleware to generate unique topicId before saving
topicSchema.pre('save', async function(next) {
    try {
        const count = await this.constructor.countDocuments();
        this.topicId = `topic-${count + 1}`;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Topic', topicSchema);
