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
module.exports = { rollDice, movePlayer, getPossiblePositions };
