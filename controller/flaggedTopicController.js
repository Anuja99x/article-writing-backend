const FlaggedTopic = require('../model/flaggedTopicSchema');

// Controller function to save a flagged topic
const saveFlaggedTopic = async (req, res) => {
    try {
        const { topicId, topicName, flaggedBy, reason } = req.body;
        const flaggedTopic = new FlaggedTopic({ topicId, topicName, flaggedBy, reason });
        await flaggedTopic.save();
        res.status(201).json(flaggedTopic);

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Controller function to get a flagged topic by its ID
const getFlaggedTopicById = async (req, res) => {
    try {
        const { flaggedTopicId } = req.params;
        const flaggedTopic = await FlaggedTopic.findById(flaggedTopicId);
        if (!flaggedTopic) {
            return res.status(404).json({ error: 'Flagged topic not found' });
        }
        res.status(200).json(flaggedTopic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    saveFlaggedTopic,
    getFlaggedTopicById
};
