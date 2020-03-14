const express = require('express');
const router = express.Router();

const gameHandlers = require('../handlers/gameHandlers');
const staticHandlers = require('../handlers/handleStaticRequests');
const movementHandlers = require('../handlers/movementHandler');
const { checkUserAccess } = require('../handlers/authorize');

router.use(checkUserAccess);
router.get('/getGameStatus', gameHandlers.getGameStatus);
router.get('/getPath', staticHandlers.getPath);
router.get('/getPlayerName', staticHandlers.getPlayerName);
router.get('/getPlayersList', staticHandlers.handlePlayersList);
router.get('/rollDice', movementHandlers.rollDice);
router.get('/getPlayersPosition', staticHandlers.handlePlayersPosition);
router.get('/myCards', staticHandlers.getMyCardsList);
router.get('/waitingPageStatus', gameHandlers.waitingPageStatus);
router.get('/distributeCards', gameHandlers.distributeCards);
router.get('/possiblePositions', movementHandlers.getPossiblePositions);
router.get(
  '/diceValueAndPossiblePositions',
  movementHandlers.getDiceAndPossiblePositions
);
router.post('/movePlayer', movementHandlers.movePlayer);

module.exports = router;
