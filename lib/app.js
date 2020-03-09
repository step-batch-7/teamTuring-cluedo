const express = require('express');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const gameHandlers = require('../handlers/gameHandlers');
const Games = require('./games');
const Sessions = require('./session');
const app = express();

app.locals.games = new Games();
app.locals.sessions = new Sessions();

app.use(express.json());
app.use(express.static('./public'));
app.get('/getPlayerName', staticHandlers.getPlayerName);
app.get('/getPlayersList', staticHandlers.handlePlayersList);
app.get('/rollDice', movementHandlers.rollDice);
app.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
app.get('/myCards', staticHandlers.getMyCardsList);
app.post('/movePlayer', movementHandlers.movePlayer);
app.post('/createGame', gameHandlers.createGame);
app.post('/joinGame', gameHandlers.joinGame);

module.exports = app;
