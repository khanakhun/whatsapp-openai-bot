const mongoose = require('mongoose');
const BotSchema = mongoose.Schema({
    dailyLimit: Number
})
exports.Bot = mongoose.model('Bot', BotSchema)

