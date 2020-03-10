class Sessions {
  constructor() {
    this.sessions = {};
  }

  create(cookie, playerId, gameId) {
    this.sessions[cookie] = { playerId, gameId };
    return cookie;
  }

  getUser(sid) {
    return this.sessions[sid];
  }

  isSessionAlive(sid) {
    return sid in this.sessions;
  }
}

module.exports = Sessions;
