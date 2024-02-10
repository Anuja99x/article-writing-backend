
const mongoose = require('mongoose');

const topicDomainSchema = new mongoose.Schema({
    topicDomainId: { type: String, unique: true },
    topicDomainName: { type: String, required: true },
    description: String,
} ,{ collection: 'topic_domains' }
);

// Middleware to generate unique topicDomainId before saving
topicDomainSchema.pre('save', async function(next) {
    try {
        const count = await this.constructor.countDocuments();
        this.topicDomainId = `topicDomain-${count + 1}`;
        next();
    } catch (err) {
        next(err);
    }
});



module.exports = mongoose.model('TopicDomain', topicDomainSchema);
