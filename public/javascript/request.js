const sendRequest = function(method, url, msg, callback) {
  const request = new XMLHttpRequest();
  request.onload = function() {
    callback(JSON.parse(this.responseText));
  };
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(msg));
};

const getDicesValue = () => {
  sendRequest('GET', '/rollDice', {}, updateDiceFace);
};

const requestHostGame = () => {
  const noOfPlayers = document.querySelector('#no-of-players').value;
  const playerName = document.querySelector('#player-name').value;
  const data = { noOfPlayers, playerName };
  sendRequest('POST', '/createGame', data, () => {
    location.assign('../waiting.html');
  });
};

const updatePlayersPosition = function() {
  sendRequest('GET', '/getPlayersPosition', {}, updatePosition);
};

const movePlayer = () => {
  const element = event.target;
  sendRequest('POST', '/movePlayer', { position: element.id }, confirmMovement);
};

const getPlayerList = function() {
  sendRequest('GET', '/getPlayersList', {}, generatePlayerList);
};

const displayPlayerName = function() {
  sendRequest('GET', '/getPlayerName', {}, displayName);
};

const getMyCards = function() {
  sendRequest('GET', '/myCards', {}, displayMyCards);
};

const updateActivityLog = function() {
  sendRequest('GET', '/activityLog', {}, addActivity);
};

const joinPlayer = function() {
  const playerName = document.querySelector('#joined-player').value;
  const gameId = document.querySelector('#game-id').value;
  const data = { playerName, gameId };
  sendRequest('POST', '/joinGame', data, confirmJoin);
};
