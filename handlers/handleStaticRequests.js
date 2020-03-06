const handlePlayersPosition = function(req, res) {
  const playerInitPos = ['10_1', '15_1', '24_7', '24_20', '1_18', '8_25'];
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ playerInitPos }));
};

module.exports = { handlePlayersPosition };
