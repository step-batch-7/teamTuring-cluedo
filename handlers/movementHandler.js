const getDiceValue = () => Math.ceil(Math.random() * 6);

const rollDice = function(req, res) {
  const game = req.game;
  const values = [getDiceValue(), getDiceValue()];
  game.updateDiceValue(values);
  game.addActivity(
    req.player,
    `has rolled dice and got ${values[0] + values[1]}`
  );
  res.json({ values });
};

const movePlayer = (req, res) => {
  const game = req.game;
  const { position } = req.body;
  const { hasMoved, player } = game.movePlayer(req.player, position);
  const positions = game.getPlayersPosition();
  res.json({ hasMoved, positions, player });
};

module.exports = { rollDice, movePlayer };
