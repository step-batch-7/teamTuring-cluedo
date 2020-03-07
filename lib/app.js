const express = require('express');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const Game = require('./game');

const app = express();

app.locals.game = new Game();

app.use(express.json());
app.use(express.static('./public'));

app.get('/getPlayerName', staticHandlers.getPlayerName);
app.get('/getPlayersList', staticHandlers.handlePlayersList);
app.get('/rollDice', movementHandlers.rollDice);
app.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
app.get('/myCards', staticHandlers.getMyCardsList);
app.post('/movePlayer', movementHandlers.movePlayer);

module.exports = app;
