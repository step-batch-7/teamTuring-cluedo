'use strict';

const paths = require('../data/paths');

class Game {
  constructor() {
    this.players = [
      {
        id: 1,
        name: 'turing',
        character: 'scarlet',
        position: '8_25'
      },
      {
        id: 2,
        name: '',
        character: 'mustard',
        position: '1_18'
      },
      {
        id: 3,
        name: '',
        character: 'white',
        position: '10_1'
      },
      {
        id: 4,
        name: '',
        character: 'green',
        position: '15_1'
      },
      {
        id: 5,
        name: '',
        character: 'peacock',
        position: '24_7'
      },
      {
        id: 6,
        name: '',
        character: 'plum',
        position: '24_20'
      }
    ];
    this.diceValues = [];
  }
  getPlayersPosition() {
    return this.players.map(player => {
      return { character: player.character, position: player.position };
    });
  }

  updateDiceValue(values) {
    this.diceValues = values;
  }

  getDiceValue() {
    return this.diceValues;
  }

  movePlayer(location) {
    const scarlet = this.players[0];
    const diceValue = this.diceValues.reduce((sum, number) => sum + number, 0);
    const validPositions = findPossiblePaths(diceValue, scarlet.position, []);
    if (!validPositions.includes(location)) {
      return false;
    }
    scarlet.position = location;
    this.diceValues = [];
    return true;
  }
}
const findNextPositions = function(position, movedPosition) {
  const [x, y] = position.split('_');
  const nextPos = [
    `${+x - 1}_${y}`,
    `${x}_${+y - 1}`,
    `${+x + 1}_${y}`,
    `${x}_${+y + 1}`
  ];
  return nextPos.filter(
    pos => paths.includes(pos) && !movedPosition.includes(pos)
  );
};
const getUniqueValues = data => {
  return data.reduce((c, e) => (c.includes(e) ? c : c.concat(e)), []);
};
const findPossiblePaths = function(diceValue, position, movedPosition) {
  movedPosition.push(position);
  if (diceValue === 0) {
    return [position];
  }
  let newPos = [];
  const nextPossiblePos = findNextPositions(position, movedPosition);
  nextPossiblePos.forEach(pos => {
    newPos = newPos.concat(
      findPossiblePaths(diceValue - 1, pos, movedPosition.slice())
    );
  });
  return getUniqueValues(newPos);
};

module.exports = Game;
