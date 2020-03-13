const express = require('express');
const cookie = require('cookie-parser');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const gameHandlers = require('../handlers/gameHandlers');
const { authorize, checkUserAccess } = require('../handlers/authorize');
const Games = require('./games');
const Sessions = require('./session');
const app = express();
const router = express.Router();
app.locals.games = new Games();
app.locals.sessions = new Sessions();

app.use(express.json());
app.use(cookie());

app.get('/', (req, res) => {
  res.redirect('/waiting.html');
});

app.post('/joinGame', gameHandlers.joinGame);
app.post('/createGame', gameHandlers.createGame);
app.get('/waiting.html', authorize);
app.get('/game.html', authorize);

app.use('/game', router);
router.use(checkUserAccess);
router.get('/getGameStatus', gameHandlers.getGameStatus);
router.get('/getPath', staticHandlers.getPath);
router.get('/getPlayerName', staticHandlers.getPlayerName);
router.get('/getPlayersList', staticHandlers.handlePlayersList);
router.get('/rollDice', movementHandlers.rollDice);
router.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
router.get('/myCards', staticHandlers.getMyCardsList);
router.get('/checkNoOfPlayers', gameHandlers.checkNoOfPlayers);
router.get('/distributeCards', gameHandlers.distributeCards);
router.post('/movePlayer', movementHandlers.movePlayer);
router.get('/possiblePositions', movementHandlers.getPossiblePositions);
router.get('/changeTurn', gameHandlers.changeTurn);
router.get(
  '/diceValueAndPossiblePositions',
  movementHandlers.getDiceAndPossiblePositions
);
app.use(express.static('./public'));
module.exports = app;
