const handlePlayersPosition = function(req, res) {
  const playerInitPos = req.app.locals.game.getPlayersPosition();
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ playerInitPos }));
};

module.exports = { handlePlayersPosition };
