const Keyword = require('../model/keywordSchema');

const { v4: uuidv4 } = require('uuid');

const createKeyword = async (req, res) => {
    try {
        const { topicDomainId, keywordName, description } = req.body;
        // Generate a UUIDv4 for keywordId
        const keywordId = uuidv4();
        const keyword = new Keyword({ keywordId, topicDomainId, keywordName, description });
        await keyword.save();
        res.status(201).json(keyword);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getKeywordCount = async (req, res) => {
    try {
        // Count the number of topic domains in the database
        const keywordCount = await Keyword.countDocuments();

        // Respond with the count of topic domains
        res.status(200).json({ count: keywordCount });
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};

const getKeywordsByTopicDomainId = async (req, res) => {
    try {
      const { topicDomainId } = req.params; // Change req.query to req.params
  
      // Query the database to find keywords by topic domain ID
      const keywords = await Keyword.find({ topicDomainId });
  
      // Respond with the fetched keywords
      res.status(200).json(keywords);
    } catch (error) {
      // Handle errors and send error response
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteKeyword = async (req, res) => {
    try {
        // Extract topic domain ID from request parameters
        const { topicDomainId } = req.params;

        // Find and delete all keywords associated with the specified topic domain ID
        const result = await Keyword.deleteMany({ topicDomainId });

        // Check if any keywords were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Keywords deleted successfully' });
        } else {
            res.status(404).json({ error: 'No keywords found for the specified topic domain' });
        }
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message });
    }
};



// Export the controller functions
module.exports = {
    createKeyword,
    getKeywordCount,
    getKeywordsByTopicDomainId,
    deleteKeyword 
};