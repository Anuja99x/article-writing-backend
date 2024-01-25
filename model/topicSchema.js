
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    topicDomain: { type: String, required: true },
    // Add any other fields as needed
   
}, { collection: 'topics' });

module.exports = mongoose.model('Topic', topicSchema);
