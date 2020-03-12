const getDiceValue = () => Math.ceil(Math.random() * 6);

const rollDice = function(req, res) {
  const game = req.game;
  const values = [getDiceValue(), getDiceValue()];
  game.updateDiceValue(values, req.player);
  res.json({ values });
};

const getPossiblePositions = function(req, res) {
  const game = req.game;
  const { diceValue } = req.body;
  const possiblePositions = game.getPossiblePositions(req.player, diceValue);
  res.json(possiblePositions);
};

const movePlayer = (req, res) => {
  const game = req.game;
  const { position } = req.body;
  const { hasMoved, player } = game.movePlayer(req.player, position);
  const positions = game.getPlayersPosition();
  res.json({ hasMoved, positions, player });
};

const getDiceAndPossiblePositions = function(req, res) {
  const game = req.game;
  const player = req.player;
  let diceValues = [];
  let possiblePositions = [];
  if (game.isPlayersTurn(player)) {
    diceValues = game.diceValues;
    const diceValue = diceValues.reduce((sum, value) => sum + value, 0);
    possiblePositions = game.getPossiblePositions(player, diceValue);
  }
  res.json({ diceValues, possiblePositions });
};

module.exports = {
  rollDice,
  movePlayer,
  getPossiblePositions,
  getDiceAndPossiblePositions
};
