const getDiceValue = () => Math.ceil(Math.random() * 6);

const rollDice = function(req, res) {
  const values = [getDiceValue(), getDiceValue()];
  req.app.locals.game.updateDiceValue(values);
  res.json({ values });
};

const movePlayer = (req, res) => {
  const game = req.app.locals.game;
  const { position } = req.body;
  const hasMoved = game.movePlayer(position);
  const positions = game.getPlayersPosition();
  res.send({ hasMoved, positions });
};

module.exports = { rollDice, movePlayer };
