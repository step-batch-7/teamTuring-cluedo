const express = require('express');
const staticHandlers = require('../handlers/handleStaticRequests');
const { rollDice } = require('../handlers/diceHandlers');
const Game = require('./game');

const app = express();

app.locals.game = new Game();

app.use(express.json());
app.use(express.static('./public'));

app.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
app.get('/rollDice', rollDice);

module.exports = app;
