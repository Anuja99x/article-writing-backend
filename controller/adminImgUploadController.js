const fileparser = require('../util/fileparser');
const userController = require('./userController');

let userId;

const upload = async (req, res) => {
    await fileparser(req).then(result => {
        saveImgUrl(result.Location);
        res.status(200).json({ message: "File uploaded successfully" });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    });
}

const setUserId = (req, res) => {
    userId = req.body.userId;
    res.status(200).json({message:"userId set successfully"});
}

const saveImgUrl = (location)=>{
    if (userId) {
        userController.updateUserImg(userId, location);    
    }else{
        console.log("userId not set");
    }
}

module.exports = {
    upload,
    setUserId,
}