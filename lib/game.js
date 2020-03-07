'use strict';

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
}

module.exports = Game;
