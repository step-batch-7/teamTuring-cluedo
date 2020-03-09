class Sessions {
  constructor() {
    this.sessions = {};
    this.lastCookie = 999;
  }

  create(playerId, gameId) {
    this.lastCookie += 1;
    this.sessions[this.lastCookie] = { playerId, gameId };
    return this.lastCookie;
  }

  // getUser(cookie) {
  //   return this.sessions[cookie];
  // }

  isSessionAlive(cookie) {
    return cookie in this.sessions;
  }

  // clearSession(cookie) {
  //   delete this.sessions[cookie];
  // }
}

module.exports = Sessions;
