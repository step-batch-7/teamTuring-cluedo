'use strict';

const { getValidPositions } = require('./movementUtility');
const characters = require('../data/characters.json');
class Game {
  constructor(totalPlayers) {
    this.players = [];
    this.diceValues = [];
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

  addPlayer(name) {
    const id = this.nextPlayerId;
    this.players.push({ id, character: characters[id], name, cards: [] });
  }

  get nextPlayerId() {
    return this.players.length;
  }
}

module.exports = Game;
