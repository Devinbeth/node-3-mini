require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const mc = require(`./controllers/messages_controller`);
const createInitialSession = require('./middlewares/session.js');
const filter = require('./middlewares/filter.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 10
    }
}));

app.use((req, res, next) => createInitialSession(req, res, next));

// app.use((req, res, next) => {
//     if (req.method === 'POST' || req.method === 'PUT') {
//         filter(req, res, next);
//     } else {
//         next();
//     }
// });

const messagesBaseUrl = "/api/messages";
app.post(messagesBaseUrl, filter, mc.create);
app.get(messagesBaseUrl, mc.read);
app.put(`${messagesBaseUrl}`, filter, mc.update);
app.delete(`${messagesBaseUrl}`, mc.delete);

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });
