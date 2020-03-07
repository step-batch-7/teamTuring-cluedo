const express = require('express');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const Game = require('./game');

const app = express();

app.locals.game = new Game();

app.use(express.json());
app.use(express.static('./public'));

app.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
app.get('/rollDice', movementHandlers.rollDice);
app.post('/movePlayer', movementHandlers.movePlayer);
app.get('/getPlayersList', staticHandlers.handlePlayersList);
app.get('/getPlayersList', staticHandlers.handlePlayersList);

module.exports = app;
