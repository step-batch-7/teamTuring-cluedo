const getDiceValue = () => Math.ceil(Math.random() * 6);

const rollDice = function(req, res) {
  const values = [getDiceValue(), getDiceValue()];
  req.app.locals.game.updateDiceValue(values);
  res.json({ values });
};

module.exports = { rollDice };
