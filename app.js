const express = require('express')
const app = express()
const TelegramBot = require('node-telegram-bot-api');
const pg = require('pg')
const path = require('path')
//app.use(express.static(path.join('./', 'client')));
app.use(express.static(path.join('./', 'client_react/build')));

const config = {
    user: 'postgres',
    database: 'db_bot_1',
    password: 'postgres',
    port: 5432
};

const pool = new pg.Pool(config);

// replace the value below with the Telegram token you receive from @BotFather
const token = '7008274321:AAGuifNj8_0U5CJFkOOIdOoG9_uvEQGzRwM';

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

app.get('/add_user', function (req, res) {
    console.log(req.query)

    let name = req.query.name
    let lastname = req.query.lastname
    let age = +req.query.age
    let tg_login = req.query.tg_login

    let result_str_to_save = `INSERT INTO users_list (name,lastname,age,tg_login) VALUES ('${name}', '${lastname}', '${age}', '${tg_login}');`;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(result_str_to_save, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);

            res.status(200).json({ response: result.rows })
        })
    })
})

app.get('/delete_user', function (req, res) {
    console.log(req.query)

    let id_user = req.query.id_user

    let result_str_to_save = `DELETE FROM users_list WHERE id = '${id_user}';`;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(result_str_to_save, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);

            res.status(200).json({ response: result.rows })
        })
    })
})

app.get('/update_user', function (req, res) {
    // приходящий обьект в гет запросе
    console.log(req.query)

    let result = []
    // условие по ключам
    if (req.query.name) {

        result.push(`name='${req.query.name}'`)
    }
    if (req.query.lastname) {
        result.push(`lastname='${req.query.lastname}'`)
    }
    if (req.query.age) {
        result.push(`age='${req.query.age}'`)
    }
    if (req.query.tg_login) {
        result.push(`tg_login='${req.query.tg_login}'`)
    }
    console.log(result);
    console.log(result.join(', '));
    let result_str_to_save = `UPDATE users_list SET ${result.join(', ')}  WHERE id = '${req.query.id_user}';`;
    console.log(result_str_to_save);

    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(result_str_to_save, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);

            res.status(200).json({ response: result.rows })
        })
    })
})

app.get('/users', function (req, res) {

    let req_str_to_database = `SELECT * FROM users_list;`;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(req_str_to_database, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);

            res.status(200).json({ response: result.rows })
        })
    })
})

app.listen(3010, console.log("сервер запущен"))