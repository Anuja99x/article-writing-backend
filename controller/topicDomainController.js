const TopicDomain = require('../model/topicDomainSchema');

const createTopicDomain = async (req, res) => {
    try {
        const count = await TopicDomain.countDocuments();
        const topicDomainId = `topicDomain-${count + 1}`;

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

// Export the controller functions
module.exports = {
    createTopicDomain,
    getTopicDomains
};
/*

const TopicDomain = require('../model/topicDomainSchema');



// Controller function to create a new topic domain
const createTopicDomain = async (req, res) => {
    try {
        // Extract topic domain data from request body
        const { topicDomainName, description } = req.body;

        // Create a new topic domain instance
        const topicDomain = new TopicDomain({
            topicDomainName,
            description
        });

        // Save the topic domain to the database
        await topicDomain.save();

        // Respond with the created topic domain object including its UUID
        res.status(201).json({
            topicDomainId: topicDomain.topicDomainId,
            topicDomainName: topicDomain.topicDomainName,
            description: topicDomain.description
        });
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ error: error.message  });
    }
};

*/