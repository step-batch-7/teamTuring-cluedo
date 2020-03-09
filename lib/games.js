const Game = require('./game');
class Games {
  constructor() {
    this.lastGameId = 1233;
  }
  create(noOfPlayers) {
    this.lastGameId += 1;
    this[this.lastGameId] = new Game(noOfPlayers);
    return this.lastGameId;
  }
}

module.exports = Games;
