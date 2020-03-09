const Game = require('./game');
class Games {
  constructor(currentGames) {
    this.currentGames = currentGames;
  }
  create(gameId, playerId, noOfPlayers, playerName) {
    const player = {
      id: playerId,
      name: playerName,
      character: 'scarlet',
      position: '8_25',
      cards: []
    };
    this[gameId] = new Game([player], [], noOfPlayers);
  }
}

module.exports = Games;
