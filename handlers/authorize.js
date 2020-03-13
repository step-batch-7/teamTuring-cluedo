const authorize = function(req, res, next) {
  const sessions = req.app.locals.sessions;
  const games = req.app.locals.games;
  if (sessions.isSessionAlive(req.cookies.sid)) {
    const { gameId, playerId } = sessions.getUser(req.cookies.sid);
    req.player = playerId;
    req.game = games.getGame(gameId);
    return next();
  }
  return res.redirect('/home.html');
};

module.exports = { authorize };
