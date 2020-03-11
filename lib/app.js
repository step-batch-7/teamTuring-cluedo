const express = require('express');
const cookie = require('cookie-parser');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const gameHandlers = require('../handlers/gameHandlers');
const { authorize } = require('../handlers/authorize');
const Games = require('./games');
const Sessions = require('./session');
const app = express();

app.locals.games = new Games();
app.locals.sessions = new Sessions();

app.use(express.json());
app.use(cookie());

app.get('/', (req, res) => {
  res.redirect('/waiting.html');
});
app.get('/index.html', authorize);
app.get('/waiting.html', authorize);
app.get('/*', express.static('./public'));
app.get('/activityLog', authorize, gameHandlers.updateActivityLog);

app.post('/joinGame', gameHandlers.joinGame);
app.post('/createGame', gameHandlers.createGame);

app.get('/getPlayerName', authorize, staticHandlers.getPlayerName);
app.get('/getPlayersList', authorize, staticHandlers.handlePlayersList);
app.get('/rollDice', authorize, movementHandlers.rollDice);
app.get('/getPlayersPosition', authorize, staticHandlers.handlePlayersPosition);
app.get('/myCards', authorize, staticHandlers.getMyCardsList);
app.get('/checkNoOfPlayers', authorize, gameHandlers.checkNoOfPlayers);
app.get('/distributeCards', authorize, gameHandlers.distributeCards);
app.post('/movePlayer', authorize, movementHandlers.movePlayer);

module.exports = app;
