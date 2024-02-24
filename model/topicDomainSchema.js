
const mongoose = require('mongoose');

const topicDomainSchema = new mongoose.Schema({
    topicDomainId: { type: String, unique: true },
    topicDomainName: { type: String, required: true },
    description: String,
} ,{ collection: 'topic_domains' }
);



module.exports = mongoose.model('TopicDomain', topicDomainSchema);
