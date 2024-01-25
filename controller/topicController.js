
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
    Topic.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
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

module.exports = {
    saveTopic,
    updateTopic,
    getAllTopics,
    getOneTopic
};
