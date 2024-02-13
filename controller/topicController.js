const Topic = require('../model/topicSchema');
const { v4: uuidv4 } = require('uuid');

const createTopic = async (req, res) => {
    try {
        const { topicDomainId, keywordId, topicName, description } = req.body;
        // Generate a UUIDv4
        const topicId = `topic-${uuidv4()}`;
        const topic = new Topic({ topicId, topicDomainId, keywordId, topicName, description });
        await topic.save();
        res.status(201).json(topic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllTopics = async (req, res) => {
    try {
        // Retrieve all topic domains from the database
        const topics = await Topic.find();

        // Respond with the retrieved topic domains
        res.status(200).json(topics);
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
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

const getTopicsByTopicDomainId = async (req, res) => {
    try {
      const { topicDomainId } = req.params; // Change req.query to req.params
  
      // Query the database to find keywords by topic domain ID
      const topics = await Topic.find({ topicDomainId });
  
      // Respond with the fetched keywords
      res.status(200).json(topics);
    } catch (error) {
      // Handle errors and send error response
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteTopicsByTopicDomain = async (req, res) => {
    try {
        // Extract topic domain ID from request parameters
        const { topicDomainId } = req.params;

        // Find and delete all keywords associated with the specified topic domain ID
        const result = await Topic.deleteMany({ topicDomainId });

        // Check if any keywords were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Topics deleted successfully' });
        } else {
            res.status(404).json({ error: 'No topics found for the specified topic domain' });
        }
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};

const deleteTopicByTopics = async (req, res) => {
    try {
        // Extract keyword ID from request parameters
        const { topicId } = req.params;

        // Find and delete the keyword by its ID
        const result = await Topic.deleteOne({ topicId });

        // Check if any keyword was deleted
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Topic deleted successfully' });
        } else {
            res.status(404).json({ error: 'No topic found with the specified ID' });
        }
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};

const editTopic = async (req, res) => {
    try {
        // Extract topic ID and updated data from request body
        const {topicId } = req.params;
        const { topicDomainId, keywordId, topicName, description } = req.body;

        // Find the topic  by ID and update it with the new data
        const result = await Topic.findOneAndUpdate(
            { topicId },
            { topicDomainId, keywordId, topicName, description },
            { new: true } // Return the updated document
        );

        if (result) {
            res.status(200).json({ message: 'Topic updated successfully', updatedTopicDomain: result });
        } else {
            res.status(404).json({ error: 'Topic  not found' });
        }
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createTopic,
    getTopicCount,
    getTopicsByTopicDomainId,
    deleteTopicsByTopicDomain,
    deleteTopicByTopics,
    getAllTopics,
    editTopic
    
};
