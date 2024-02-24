const FlaggedTopic = require('../model/flaggedTopicSchema');
const { v4: uuidv4 } = require('uuid');
// Controller function to save a flagged topic
const saveFlaggedTopic = async (req, res) => {
    try {
        
        const { topicId, topicName, flaggedBy, reason } = req.body;
        const flaggedTopicId = `flaggedTopic-${uuidv4()}`;
        const flaggedTopic = new FlaggedTopic({ flaggedTopicId, topicId, topicName, flaggedBy, reason });
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
        const flaggedTopic = await FlaggedTopic.findOne({ flaggedTopicId: flaggedTopicId }, { topicId: 1, topicName: 0, _id: 0  });
      
        res.status(200).json(flaggedTopic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUniqueTopicIds = async (req, res) => {
    try {
        const uniqueTopics = await FlaggedTopic.aggregate([
            {
                $group: {
                    _id: "$topicId", // Group by topicId
                    topicName: { $first: "$topicName" }, 
                    topicId:{ $first: "$topicId" }, 
                    count: { $sum: 1 }, // Count occurrences of each topicId
                    reasons: { $push: "$reason" } // Collect reasons for each topicId
                }
            }
        ]);

        res.status(200).json(uniqueTopics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






module.exports = {
    saveFlaggedTopic,
    getFlaggedTopicById,
    getUniqueTopicIds
};
