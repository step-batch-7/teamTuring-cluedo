const sendRequest = function(method, url, msg, callback) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    callback(JSON.parse(this.responseText));
  };
  request.onerror = function(error) {
    updateStatusBar('Something went wrong! please try again.');
  };
  request.send(JSON.stringify(msg));
};

const requestPath = function() {
  sendRequest('GET', '/game/getPath', {}, loadPath);
};

const getDicesValue = function() {
  const diceRoom = document.querySelector('#dices');
  diceRoom.classList.add('block');
  sendRequest('GET', '/game/rollDice', {}, updateDiceFace);
};

const getDicesValueAndPossiblePositions = function() {
  const url = '/game/diceValueAndPossiblePositions';
  sendRequest('GET', url, {}, updateDiceAndPossibilities);
};

const requestHostGame = function() {
  const noOfPlayers = document.querySelector('#no-of-players').value;
  const playerName = document.querySelector('#player-name').value;
  if (!validatePlayerName() || !validateUserNum()) {
    return;
  }
  const data = { noOfPlayers, playerName };
  sendRequest('POST', '/createGame', data, () => {
    location.assign('../waiting.html');
  });
};

const updatePlayersPosition = function() {
  sendRequest('GET', '/game/getPlayersPosition', {}, assignPlayerPosition);
};

const movePlayer = function() {
  const element = event.target;
  sendRequest(
    'POST',
    '/game/movePlayer',
    { position: element.id },
    confirmMovement
  );
  changeTurn();
};

const getPlayerList = function() {
  sendRequest('GET', '/game/getPlayersList', {}, generatePlayerList);
};

const displayPlayerName = function() {
  sendRequest('GET', '/game/getPlayerName', {}, displayName);
};

const getMyCards = function() {
  sendRequest('GET', '/game/myCards', {}, displayMyCards);
};

const getGameStatus = function() {
  sendRequest('GET', '/game/getGameStatus', {}, changeStatus);
};

const joinPlayer = function() {
  const playerName = document.querySelector('#joined-player').value;
  const gameId = document.querySelector('#game-id').value;
  if (playerName.length < 3) {
    return showErrorMessage(
      '#nameError-join',
      'Name should be at least 3 characters.'
    );
  }
  const data = { playerName, gameId };
  sendRequest('POST', '/joinGame', data, confirmJoin);
};

const getPossiblePositions = function() {
  sendRequest('GET', '/game/possiblePositions', {}, showPossiblePositions);
};

const changeTurn = function() {
  sendRequest('GET', '/game/changeTurn', {}, () => {});
};
