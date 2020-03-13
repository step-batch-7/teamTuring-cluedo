const getDiceValue = () => Math.ceil(Math.random() * 6);

const rollDice = function(req, res) {
  const game = req.game;
  const values = [getDiceValue(), getDiceValue()];
  game.updateDiceValue(values);
  res.json({ values });
};

const getPossiblePositions = function(req, res) {
  const game = req.game;
  const possiblePositions = game.getPossiblePositions(req.player);
  const diceValue = game.getDiceValues().reduce((sum, num) => sum + num, 0);
  const isTurnChange = possiblePositions.length === 0;
  game.addActivity(req.player, `rolled dice and got ${diceValue}`);
  game.changeMessage(req.player, 'Select a position to move.');
  res.json({ possiblePositions, isTurnChange });
};

const movePlayer = (req, res) => {
  const game = req.game;
  const { position } = req.body;
  const { hasMoved, player } = game.movePlayer(req.player, position);
  const positions = game.getPlayersPosition();
  res.json({ hasMoved, positions, player });
};

const getDiceAndPossiblePositions = function(req, res) {
  const { game, player } = req;
  let diceValues = [];
  let possiblePositions = [];
  if (game.isPlayersTurn(player)) {
    possiblePositions = game.getPossiblePositions(player);
    diceValues = game.getDiceValues();
  }
  res.json({ diceValues, possiblePositions });
};

module.exports = {
  rollDice,
  movePlayer,
  getPossiblePositions,
  getDiceAndPossiblePositions
};
