const TopicDomain = require('../model/topicDomainSchema');

const { v4: uuidv4 } = require('uuid');

const createTopicDomain = async (req, res) => {
    try {
        
        const topicDomainId = `topicDomain-${uuidv4()}`; // Concatenate the prefix with the UUID

        const { topicDomainName, description } = req.body;
        const topicDomain = new TopicDomain({ topicDomainId, topicDomainName, description });

        await topicDomain.save();

        res.status(201).json(topicDomain);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getTopicDomains = async (req, res) => {
    try {
        // Retrieve all topic domains from the database
        const topicDomains = await TopicDomain.find();

        // Respond with the retrieved topic domains
        res.status(200).json(topicDomains);
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};

const getTopicDomainsByTopicDomainId = async (req, res) => {
    try {
      const { topicDomainId } = req.params; // Change req.query to req.params
  
      // Query the database to find keywords by topic domain ID
      const topicDomain = await TopicDomain.findOne({ topicDomainId: topicDomainId }, { topicDomainName: 1, _id: 0  });
  
      // Respond with the fetched keywords
      res.status(200).json(topicDomain);
    } catch (error) {
      // Handle errors and send error response
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


const getTopicDomainCount = async (req, res) => {
    try {
        // Count the number of topic domains in the database
        const topicDomainCount = await TopicDomain.countDocuments();

        // Respond with the count of topic domains
        res.status(200).json({ count: topicDomainCount });
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};


const deleteTopicDomain = async (req, res) => {
    try {
        // Extract topic domain ID from request parameters
        const { topicDomainId } = req.params;

        // Find the topic domain by ID and delete it
        const result = await TopicDomain.deleteOne({ topicDomainId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Topic domain deleted successfully' });
        } else {
            res.status(404).json({ error: 'Topic domain not found' });
        }
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};

const editTopicDomain = async (req, res) => {
    try {
        // Extract topic domain ID and updated data from request body
        const { topicDomainId } = req.params;
        const { topicDomainName, description } = req.body;

        // Find the topic domain by ID and update it with the new data
        const result = await TopicDomain.findOneAndUpdate(
            { topicDomainId },
            { topicDomainName, description },
            { new: true } // Return the updated document
        );

        if (result) {
            res.status(200).json({ message: 'Topic domain updated successfully', updatedTopicDomain: result });
        } else {
            res.status(404).json({ error: 'Topic domain not found' });
        }
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};




// Export the controller functions
module.exports = {
    createTopicDomain,
    getTopicDomains,
    deleteTopicDomain,
    editTopicDomain,
    getTopicDomainCount,
    getTopicDomainsByTopicDomainId
};
