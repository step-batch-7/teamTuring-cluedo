'use strict';

const { getValidPositions } = require('./movementUtility');
class Game {
  constructor(players, diceValues, totalPlayers) {
    this.players = players;
    this.diceValues = diceValues;
    this.totalPlayers = totalPlayers;
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
