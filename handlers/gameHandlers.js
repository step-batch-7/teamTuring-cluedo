const createGame = function(req, res) {
  const { noOfPlayers, playerName } = req.body;
  const games = req.app.locals.games;
  const session = req.app.locals.session;
  const { gameId, playerId } = session.create();
  games.create(gameId, playerId, noOfPlayers, playerName);
  res.cookie('game', gameId);
  res.cookie('currentPlayer', playerId);
  res.json({ gameId, playerId });
};

module.exports = { createGame };
