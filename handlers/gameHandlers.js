const createGame = function(req, res) {
  const { noOfPlayers, playerName } = req.body;
  const games = req.app.locals.games;
  const sessions = req.app.locals.sessions;
  const gameId = games.create(noOfPlayers);
  games[gameId].addPlayer(playerName);
  const sid = sessions.create(0, gameId);
  res.cookie('sid', sid);
  res.json({});
};

const joinGame = function(req, res) {
  const { playerName, gameId } = req.body;
  const games = req.app.locals.games;
  const sessions = req.app.locals.sessions;
  if (!(gameId in games)) {
    return res.json({ hasJoined: false });
  }
  const playerId = games[gameId].nextPlayerId;
  const sid = sessions.create(playerId, gameId);
  games[gameId].addPlayer(playerName);
  res.cookie('sid', sid);
  res.json({ hasJoined: true });
};

module.exports = { createGame, joinGame };
