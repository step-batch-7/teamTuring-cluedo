const express = require('express');
const cookie = require('cookie-parser');

const gameHandlers = require('../handlers/gameHandlers');
const router = require('./gameRoutes');
const { authorize } = require('../handlers/authorize');
const Games = require('./games');
const Sessions = require('./session');

const app = express();
app.locals.games = new Games();
app.locals.sessions = new Sessions();

app.use(express.json());
app.use(cookie());

app.get('/', (req, res) => res.redirect('/waiting.html'));
app.get('/waiting.html', authorize);
app.get('/game.html', authorize);

app.post('/joinGame', gameHandlers.joinGame);
app.post('/createGame', gameHandlers.createGame);

app.use('/game', router);
app.use(express.static('./public'));
module.exports = app;
