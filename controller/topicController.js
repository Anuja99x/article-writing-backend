const Topic = require('../model/topicSchema');

exports.createTopic = async (req, res) => {
    try {
        const { topicDomainId, keywordId, topicName, description } = req.body;
        const topic = new Topic({ topicDomainId, keywordId, topicName, description });
        await topic.save();
        res.status(201).json(topic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
