const handleXhrRequest = function(url, data, callback) {
  const req = new XMLHttpRequest();
  req.onload = function() {
    callback(this.responseText);
  };
  req.open('GET', url);
  req.setRequestHeader('content-type', 'application/json');
  req.send(JSON.stringify(data));
};

const getPlayersStartingPosition = function() {
  handleXhrRequest('/getPlayersPosition', {}, addPlayerInitPos);
};
