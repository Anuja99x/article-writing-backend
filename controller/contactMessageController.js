const ContactMsg = require('../model/contactMessageSchema');

const getAllMessages = (req, res) => {
    ContactMsg.find().then(result => {
        res.status(200).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    }

module.exports = {getAllMessages}