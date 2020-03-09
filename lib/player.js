const Game = require('./game');
class Games {
  constructor(currentGames) {
    this.currentGames = currentGames;
  }
  create(noOfPlayers, playerName, gameId) {
    const player = {
      id: 1,
      name: playerName,
      character: 'scarlet',
      position: '8_25',
      cards: []
    };
    this[gameId] = new Game([player], [], noOfPlayers);
  }
  get currentPlayerId(gameId) {
    this[gameId].players;
  }
}
