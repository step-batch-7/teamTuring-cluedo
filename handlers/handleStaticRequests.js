const handlePlayersPosition = function(req, res) {
  const game = req.game;
  const playersPosition = game.getPlayersPosition();
  res.json(playersPosition);
};

const handlePlayersList = function(req, res) {
  const game = req.game;
  const playersList = game.getPlayersList();
  res.json(playersList);
};

const getPlayerName = function(req, res) {
  const game = req.game;
  const playerName = game.getPlayerName(req.player);
  res.json(playerName);
};

const getMyCardsList = function(req, res) {
  const game = req.game;
  const cardsList = game.getCards(req.player);
  res.json(cardsList);
};

module.exports = {
  handlePlayersPosition,
  handlePlayersList,
  getPlayerName,
  getMyCardsList
};
