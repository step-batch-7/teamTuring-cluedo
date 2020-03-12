const getCookie = function() {
  return new Date().getTime().toString() + Math.random();
};

const createGame = function(req, res) {
  const { noOfPlayers, playerName } = req.body;
  const { games, sessions } = req.app.locals;
  const gameId = games.create(noOfPlayers);
  games[gameId].addPlayer(playerName);
  const sid = sessions.create(getCookie(), 0, gameId);
  res.cookie('sid', sid);
  res.json({});
};

const joinGame = function(req, res) {
  const { playerName, gameId } = req.body;
  const { games, sessions } = req.app.locals;
  if (!(gameId in games)) {
    return res.json({ hasJoined: false });
  }
  if (games[gameId].hasAllJoined()) {
    return res.json({ roomFull: true });
  }
  const sid = sessions.create(getCookie(), games[gameId].nextPlayerId, gameId);
  games[gameId].addPlayer(playerName);
  res.cookie('sid', sid);
  res.json({ hasJoined: true });
};

const checkNoOfPlayers = function(req, res) {
  const { sessions } = req.app.locals;
  const { gameId } = sessions.getUser(req.cookies.sid);
  const game = req.game;
  res.json({
    gameId,
    hasAllJoined: game.hasAllJoined(),
    noOfPlayers: game.players.length,
    totalPlayer: game.totalPlayers,
    players: game.getPlayersList()
  });
};

const distributeCards = function(req, res) {
  const game = req.game;
  game.distribute();
  res.json({});
};

const getGameStatus = function(req, res) {
  const game = req.game;
  const activities = game.getActivityLog();
  const isPlayersTurn = game.isPlayersTurn(req.player);
  const canRollDice = game.canRollDice(req.player);
  const message = game.getMessage(req.player);
  const positions = game.getPlayersPosition();
  res.json({ activities, isPlayersTurn, message, canRollDice, positions });
};

const changeTurn = function(req, res) {
  const game = req.game;
  game.changeTurn();
  res.json({});
};

module.exports = {
  createGame,
  joinGame,
  checkNoOfPlayers,
  distributeCards,
  getGameStatus,
  changeTurn
};
