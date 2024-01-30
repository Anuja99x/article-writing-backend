const mongoose = require('mongoose');
const contactMsgSchema = new mongoose.Schema({
    messageId: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    name: { type: String, required: true },
    replied: { type: Boolean, default: false },
    savedAt: { type: Date, default: Date.now() }
}, { collection: 'contactMessageData' });

contactMsgSchema.index({ messageId: 1 }, { unique: true });

module.exports = mongoose.model('ContactMsg', contactMsgSchema);