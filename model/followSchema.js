const mongoose = require('mongoose');
const FollowSchema = new mongoose.Schema({
   id:{type: String, unique: true},
   readerId:{type: String, require: true},
   writerId:{type: String, require: true},
   date:{type: Date, require: true,default: Date.now()},
},{ collection: 'followers' });

module.exports = mongoose.model('Followers', FollowSchema);

