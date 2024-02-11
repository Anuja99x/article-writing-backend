const Topic = require('../model/topicSchema');
const createTopic = async (req, res) => {
    try {
        const { topicDomainId, keywordId, topicName, description } = req.body;
        const topic = new Topic({ topicDomainId, keywordId, topicName, description });
        await topic.save();
        res.status(201).json(topic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTopicCount = async (req, res) => {
    try {
        // Count the number of topic domains in the database
        const topicCount = await Topic.countDocuments();

        // Respond with the count of topic domains
        res.status(200).json({ count: topicCount });
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createTopic,
    getTopicCount
};
