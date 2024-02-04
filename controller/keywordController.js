const Keyword = require('../model/keywordSchema');

exports.createKeyword = async (req, res) => {
    try {
        const { topicDomainId, keywordName, description } = req.body;
        const keyword = new Keyword({ topicDomainId, keywordName, description });
        await keyword.save();
        res.status(201).json(keyword);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
