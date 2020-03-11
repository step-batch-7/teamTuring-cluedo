const pickRandom = function(list) {
  return Math.floor(Math.random() * list.length);
};

const selectConfidential = function(rooms, weapons, characters) {
  const confidential = [
    rooms.splice(pickRandom(rooms), 1),
    weapons.splice(pickRandom(weapons), 1),
    characters.splice(pickRandom(characters), 1)
  ];
  const rest = rooms.concat(weapons).concat(characters);
  return { confidential, rest };
};

const shuffle = function(cards) {
  return cards.reduce((cards, card) => {
    cards.splice(Math.floor(Math.random() * cards.length), 0, card);
    return cards;
  }, []);
};

module.exports = { pickRandom, selectConfidential, shuffle };
