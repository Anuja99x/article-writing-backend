const mongoose = require('mongoose');
const ReaderArticleSchema = new mongoose.Schema({
   id:{type: String, unique: true},
   title:{type: String, require: true},
   content:{type: String, require: true},
   image:{type: String, require: true},
   profilePic:{type: String, require: true},
   writer:{type: String, require: true},
   date:{type: Date, require: true,default: Date.now()},
   time:{type: String, require: true}
},{ collection: 'articleData' });

module.exports = mongoose.model('articleData', ReaderArticleSchema);

