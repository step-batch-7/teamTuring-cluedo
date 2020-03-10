'use strict';

const { getValidPositions } = require('./movementUtility');
const characters = require('../data/characters.json');
const cards = require('../data/cards.json');

class Game {
  constructor(totalPlayers) {
    this.players = [];
    this.diceValues = [];
    this.confidential = [];
    this.totalPlayers = +totalPlayers;
    this.hasDistributed = false;
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

  movePlayer(playerId, location) {
    const scarlet = this.players[playerId];
    const diceValue = this.diceValues.reduce((sum, number) => sum + number, 0);
    const validPositions = getValidPositions(scarlet, diceValue);
    if (!validPositions.includes(location)) {
      return { hasMoved: false };
    }
    scarlet.position = location;
    this.diceValues = [];
    return { hasMoved: true, player: this.players[playerId].character };
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
    const character = characters[id].name;
    const position = characters[id].position;
    this.players.push({ id, character, name, cards: [], position });
  }

  get nextPlayerId() {
    return this.players.length;
  }

  hasAllJoined() {
    return this.players.length === this.totalPlayers;
  }
  distribute() {
    if (this.hasDistributed) {
      return;
    }
    const { confidential, rest } = selectConfidential(
      cards.rooms.slice(),
      cards.weapons.slice(),
      cards.characters.slice()
    );
    this.confidential = confidential;
    shuffle(rest).forEach((card, index) => {
      this.players[index % this.totalPlayers].cards.push(card);
    });
    this.hasDistributed = true;
  }
}

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

module.exports = Game;
