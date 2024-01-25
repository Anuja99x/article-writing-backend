const Topic = require('../model/topicSchema');

const saveTopic = (req, res) => {
    const { topicId, title, description, topicDomain } = req.body;

    const topicData = new Topic({
        topicId,
        title,
        description,
        topicDomain,
        // Add other fields as needed
    });

    topicData.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

const updateTopic = (req, res) => {
    const { title, description, topicDomain } = req.body;

    Topic.updateOne({ topicId: req.params.id }, { title, description, topicDomain })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

const getAllTopics = (req, res) => {
    const searchWord = req.query.searchWord;
    const query = searchWord ? { title: { $regex: new RegExp(searchWord, 'i') } } : {};

    Topic.find(query)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error('Error in getAllTopics:', error);
            res.status(500).json(error);
        });
};



const getOneTopic = (req, res) => {
    Topic.findOne({ topicId: req.params.id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

const getTopicsByDomain = (req, res) => {
    const domainName = req.params.domainName;

    Topic.find({ topicDomain: domainName })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error('Error in getTopicsByDomain:', error);
            res.status(500).json(error);
        });
};

module.exports = {
    saveTopic,
    updateTopic,
    getAllTopics,
    getOneTopic,
    getTopicsByDomain
};
