require('dotenv').config()
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth  } = require('whatsapp-web.js');
const DB = require('./database/index');
const { completion } = require('./openAI');
const { job } = require('./utils/cronjobs');
const { USER_LIMIT_MESSAGE, checkPrompt, NOT_ALLOWED_MESSAGE, ENDING_TEXT, STARTING_TEXT } = require('./utils/messages');
const { initial } = require('./utils/mongo');
let { createNewUser, getUser, USER_LIMIT, addUsageForUser, dailyLimitCount } = require('./utils/utils');
DB.then((res) => {
    console.log('Database connection established')
    // initial();
}).catch((err) => console.log(err))

const client = new Client({
    // authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox'],
	}
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

job.start()
client.on('message', async message => {

    const contact = await message.getContact();
    const name = contact.pushname;
    const number = contact.number;
    if(dailyLimitCount > 150) {
        return
    }
    if(message.body.includes("#askirwin")) {
        if(checkPrompt(message.body)){
            essage.reply(NOT_ALLOWED_MESSAGE)
            client.isRegisteredUser(message.author).then(function(isRegistered) {
                if(isRegistered) {
                    client.sendMessage(message.author, NOT_ALLOWED_MESSAGE);
                    // message.reply(NOT_ALLOWED_MESSAGE)
                }
            })
            return 
        }
        let isContactExists = await getUser(number);

        if(isContactExists.status) {
            if(isContactExists.user.usage >= USER_LIMIT) {
                client.isRegisteredUser(message.author).then(function(isRegistered) {
                    if(isRegistered) {
                        client.sendMessage(message.author, USER_LIMIT_MESSAGE);
                        // message.reply(USER_LIMIT_MESSAGE)
                    }
                })
                // message.reply(USER_LIMIT_MESSAGE)
                
            } else {
                dailyLimitCount++;
                addUsageForUser(number, isContactExists.user.usage+1)
                let response  =  await completion(message.body)
                let MESSAGE_TO_SEND = response
                client.isRegisteredUser(message.author).then(function(isRegistered) {
                    if(isRegistered) {
                        client.sendMessage(message.author, response);
                        // message.reply(response)
                    }
                })
                // message.reply(response)
                
            }
        } else {
             createNewUser({
                contact: number,
                deviceType	: message.deviceType,
                timestamp: message.timestamp,
                author: name,
                usage: 1,
                chatId: message.id.id,
                message: message.body
             })
             let response  =  await completion(message.body)
             let MESSAGE_TO_SEND = `${response} ${ENDING_TEXT}`
            client.isRegisteredUser(message.author).then(function(isRegistered) {
                if(isRegistered) {
                    client.sendMessage(message.author, response);
                    // message.reply(response)
                }
            }) 
            // message.reply(response)
        }
    }
});

