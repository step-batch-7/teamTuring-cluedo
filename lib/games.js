const Game = require('./game');
const { pickRandom } = require('./distributionUtils');

const getGameID = num => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return (
    num + alphabets[pickRandom(alphabets)] + alphabets[pickRandom(alphabets)]
  );
};

class Games {
  constructor() {
    this.lastGameNo = 9;
  }
  create(noOfPlayers) {
    this.lastGameNo += 1;
    const gameId = getGameID(this.lastGameNo);
    this[gameId] = new Game(noOfPlayers);
    return gameId;
  }
}

module.exports = Games;
