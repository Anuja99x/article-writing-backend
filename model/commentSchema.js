const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    comId:{type: String, unique: true},
    commentorName:{type: String, require: true},
    commentContent:{type: String, require: true},
    time:{type: Date, require: true,default: Date.now},
   profilePic:{type: String, require: true},
   artId:{type: String, require: true},
},{ collection: 'commentData' });

// Add a virtual property for the formatted time


module.exports = mongoose.model('Comment', CommentSchema);

