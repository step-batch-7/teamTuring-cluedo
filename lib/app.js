const express = require('express');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const gameHandlers = require('../handlers/gameHandlers');
const Game = require('./game');
const Games = require('./games');
const Session = require('./session');
const app = express();
const players = [
  {
    id: 1,
    name: 'Turing',
    character: 'scarlet',
    position: '8_25',
    cards: ['plum', 'rope', 'kitchen']
  },
  {
    id: 2,
    name: 'Naveen',
    character: 'mustard',
    position: '1_18'
  },
  {
    id: 3,
    name: 'Shankar',
    character: 'white',
    position: '10_1'
  },
  {
    id: 4,
    name: 'Anil',
    character: 'green',
    position: '15_1'
  },
  {
    id: 5,
    name: 'Trinankur',
    character: 'peacock',
    position: '24_7'
  },
  {
    id: 6,
    name: 'Ayush',
    character: 'plum',
    position: '24_20'
  }
];
const diceValues = [];
app.locals.game = new Game(players, diceValues, 6);
app.locals.games = new Games({});
app.locals.session = new Session();

app.use(express.json());
app.use(express.static('./public'));
app.get('/getPlayerName', staticHandlers.getPlayerName);
app.get('/getPlayersList', staticHandlers.handlePlayersList);
app.get('/rollDice', movementHandlers.rollDice);
app.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
app.get('/myCards', staticHandlers.getMyCardsList);
app.post('/createGame', gameHandlers.createGame);
app.post('/movePlayer', movementHandlers.movePlayer);

module.exports = app;
