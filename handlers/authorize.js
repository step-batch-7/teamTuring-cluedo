const authorize = function(req, res, next) {
  const { sessions } = req.app.locals;
  const sid = req.cookies.sid;
  if (sessions.isSessionAlive(sid)) {
    return next();
  }
  res.redirect('/index.html');
};

const checkUserAccess = function(req, res, next) {
  const { sessions, games } = req.app.locals;
  const sid = req.cookies.sid;
  if (sessions.isSessionAlive(sid)) {
    const { gameId, playerId } = sessions.getUser(sid);
    req.player = playerId;
    req.game = games.getGame(gameId);
    return next();
  }
  res.statusCode = 403;
  return res.json({});
};

module.exports = { authorize, checkUserAccess };
