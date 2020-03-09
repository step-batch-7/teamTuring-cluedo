class Session {
  constructor() {
    this.gameId = 0;
    this.playerId = 0;
  }
  create() {
    this.gameId++;
    this.playerId++;
    return { gameId: this.gameId, playerId: this.playerId };
  }
}

module.exports = Session;
