'use strict';

const { getValidPositions } = require('./movementUtility');
class Game {
  constructor() {
    this.players = [
      {
        id: 1,
        name: 'Turing',
        character: 'scarlet',
        position: '8_25',
        cards: ['plum', 'rope', 'kitchen']
      },
      {
        id: 2,
        name: 'Naveen',
        character: 'mustard',
        position: '1_18'
      },
      {
        id: 3,
        name: 'Shankar',
        character: 'white',
        position: '10_1'
      },
      {
        id: 4,
        name: 'Anil',
        character: 'green',
        position: '15_1'
      },
      {
        id: 5,
        name: 'Trinankur',
        character: 'peacock',
        position: '24_7'
      },
      {
        id: 6,
        name: 'Ayush',
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
  getPlayersList() {
    return this.players.map(player => {
      return { character: player.character, username: player.name };
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
    const validPositions = getValidPositions(scarlet, diceValue);
    if (!validPositions.includes(location)) {
      return false;
    }
    scarlet.position = location;
    this.diceValues = [];
    return true;
  }

  getPlayerName(id) {
    const playerDetails = this.players.find(player => player.id === id);
    return playerDetails.name;
  }

  getCards(id) {
    const playerDetails = this.players.find(player => player.id === id);
    return playerDetails.cards;
  }
}

module.exports = Game;
