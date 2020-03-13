'use strict';

const characters = require('../data/characters.json');
const { Player } = require('./player');
const cards = require('../data/cards.json');
const { getValidPositions } = require('./movementUtility');
const { shuffle, selectConfidential } = require('./distributionUtils');

const capitalizeName = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const rooms = {
  Lounge: 'Lounge',
  DiningRoom: 'Dining Room',
  Kitchen: 'Kitchen',
  Ballroom: 'Ball Room',
  Conservatory: 'Conservatory',
  Billiard: 'Billiard Room',
  Library: 'Library',
  Study: 'Study Room',
  Hall: 'Hall'
};

class Game {
  constructor(totalPlayers) {
    this.players = [];
    this.diceValues = [];
    this.confidential = [];
    this.totalPlayers = +totalPlayers;
    this.hasDistributed = false;
    this.activityLog = ['Game Started.'];
    this.currentPlayerId = 0;
    this.diceRollable = true;
  }

  get nextPlayerId() {
    return this.players.length;
  }

  addPlayer(name) {
    if (this.hasAllJoined()) {
      return { roomFull: true, hasJoined: false };
    }
    const id = this.nextPlayerId;
    const character = characters[id].name;
    const position = characters[id].position;
    this.players.push(new Player(id, name, character, position));
    return { roomFull: false, hasJoined: true };
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

  getActivityLog() {
    return this.activityLog;
  }

  addActivity(playerId, msg) {
    const playerName = this.players[playerId].character;
    this.activityLog.unshift(`${capitalizeName(playerName)} ${msg}.`);
  }

  getDiceValues() {
    return this.diceValues;
  }

  getPossiblePositions(playerId) {
    const diceValue = this.getDiceValues().reduce((sum, num) => sum + num, 0);
    if (!diceValue) {
      return [];
    }
    const player = this.players[playerId];
    const allPositions = this.players.map(player =>
      player.position in rooms ? '' : player.position
    );
    const possiblePositions = getValidPositions(
      allPositions,
      player,
      diceValue
    );
    this.blockRollingDice();
    if (possiblePositions.length === 0) {
      this.changeTurn();
    }
    return possiblePositions;
  }

  movePlayer(playerId, location) {
    const player = this.players[playerId];
    player.move(location);
    if (player.lastPosition in rooms) {
      this.addActivity(
        playerId,
        `has come out of ${rooms[player.lastPosition]}`
      );
    }
    if (location in rooms) {
      this.addActivity(playerId, `has entered ${rooms[location]}`);
    }
    this.diceValues = [];
    this.changeTurn();
    return { player: this.players[playerId].character };
  }

  getPlayerName(id) {
    const playerDetails = this.players.find(player => player.id === id);
    return playerDetails.name;
  }

  getCards(id) {
    const playerDetails = this.players.find(player => player.id === id);
    return playerDetails.cards;
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

  changeMessage(playerId, message) {
    this.players[playerId].changeMessage(message);
  }

  changeTurn() {
    this.diceRollable = true;
    this.currentPlayerId = (this.currentPlayerId + 1) % this.totalPlayers;
  }

  isPlayersTurn(playerId) {
    const isPlayersTurn = +playerId === this.currentPlayerId;
    if (isPlayersTurn && this.diceRollable) {
      this.changeMessage(playerId, 'Your turn, roll dice.');
      return isPlayersTurn;
    }
    if (!isPlayersTurn) {
      this.players[playerId].changeMessage(
        `${this.currentPlayerCharacter()}'s turn.`
      );
    }
    return isPlayersTurn;
  }

  currentPlayerCharacter() {
    return capitalizeName(this.players[this.currentPlayerId].character);
  }

  canRollDice(playerId) {
    return this.isPlayersTurn(playerId) && this.diceRollable;
  }

  getMessage(playerId) {
    return this.players[playerId].message;
  }

  blockRollingDice() {
    this.diceRollable = false;
  }
}

module.exports = Game;
