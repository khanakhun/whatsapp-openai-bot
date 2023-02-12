const  CronJob = require('cron').CronJob;
const { User } = require('../database/Models/userModel');
let { dailyLimitCount } = require('./utils');
exports.job = new CronJob(
	'0 0 * * *',
	async () => {
		console.log('You will see this message every day 12:00 am');
		
		dailyLimitCount = 0
		let updateUsage  = await User.updateMany({},{
			usage: 0
		})
		if(updateUsage) {
			console.log('Limit rested for All Users ......');
		}
	},
	null,
	true,
);

