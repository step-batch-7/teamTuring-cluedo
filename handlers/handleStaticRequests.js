const handlePlayersPosition = function(req, res) {
  const playersPosition = req.app.locals.game.getPlayersPosition();
  res.json(playersPosition);
};

const handlePlayersList = function(req, res) {
  const playersList = req.app.locals.game.getPlayersList();
  res.json(playersList);
};

const getPlayerName = function(req, res) {
  const playerName = req.app.locals.game.getPlayerName(1);
  res.json(playerName);
};

module.exports = { handlePlayersPosition, handlePlayersList, getPlayerName };
