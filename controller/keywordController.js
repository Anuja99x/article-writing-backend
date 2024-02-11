const Keyword = require('../model/keywordSchema');

const createKeyword = async (req, res) => {
    try {
        const { topicDomainId, keywordName, description } = req.body;
        const keyword = new Keyword({ topicDomainId, keywordName, description });
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
// Export the controller functions
module.exports = {
    createKeyword,
    getKeywordCount
};