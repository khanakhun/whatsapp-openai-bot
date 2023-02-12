const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
	contact: { type: String, required: true},
	deviceType	: String,
	timestamp: Number,
	author: String,
	usage: Number,
	chatId: String,
	message: String,
})
exports.User = mongoose.model('User', UserSchema)

