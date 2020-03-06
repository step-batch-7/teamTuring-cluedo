const handlePlayersPosition = function(req, res) {
  const playersPosition = req.app.locals.game.getPlayersPosition();
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(playersPosition));
};

module.exports = { handlePlayersPosition };
