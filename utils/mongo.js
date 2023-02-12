const { Bot }  = require('../database/Models/botModel')
exports.initial = () => {

	Bot.ES.estimatedDocumentCount((err, count) => {
	  if (!err && count === 0) {
		new Bot({
			dailyLimit: 0
		}).save(err => {
		  if (err) {
			console.log("error", err);
		  }
		  console.log("Bot added....");
		});
	  }
	});
}

exports.getBot = async (id) => {
	let bot = await Bot.findById(id);

	if(!bot) return false;

	return bot
}
exports.updateUsageCount = async (id, pv) => {
	let bot = await Bot.findByIdAndUpdate(id,{
		dailyLimit: pv+1
	})

	if(!bot) return false;

	return bot
}
exports.resetLimit = async (id) => {
	let bot = await Bot.findByIdAndUpdate(id,{
		dailyLimit: pv+1
	})

	if(!bot) return false;

	return bot
}