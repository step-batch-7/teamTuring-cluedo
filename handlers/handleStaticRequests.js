const handlePlayersPosition = function(req, res) {
  const playersPosition = req.app.locals.game.getPlayersPosition();
  res.json(playersPosition);
};

const handlePlayersList = function(req, res) {
  const playersList = req.app.locals.game.getPlayersList();
  res.json(playersList);
};

module.exports = { handlePlayersPosition, handlePlayersList };
