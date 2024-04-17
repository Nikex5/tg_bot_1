const express = require('express')
const app = express()
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText.toLowerCase() === 'привет') {
        bot.sendMessage(chatId, 'Привет, ' + msg.from.first_name + '!');
    }
    else if (messageText.toLowerCase() === '/skills') {
        bot.sendMessage(chatId, "Пока умею немного, но разработчики уже прокачивают навыки");
    }
    else if (messageText.toLowerCase() === '/start') {
        bot.sendMessage(chatId, "Привет, " + msg.from.first_name + "! Я первый бот Никаса модела 😎");
    }
    else {
        bot.sendMessage(chatId, msg.from.first_name + ', я пока не понимаю эту команду 🤔');
    }

});



// bot.onText(/\/skills/, (msg) => {
//     const chatId = msg.chat.id;

//     bot.sendMessage(chatId, "Пока умею немного, но разработчики уже прокачивают навыки");
// });

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000, console.log("сервер запущен"))