const getDiceValue = () => Math.ceil(Math.random() * 6);

const rollDice = function(req, res) {
  res.json({ values: [getDiceValue(), getDiceValue()] });
};

module.exports = { rollDice };
