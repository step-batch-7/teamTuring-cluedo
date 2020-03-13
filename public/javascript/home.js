const showHostGame = () => {
  document.getElementById('mainDiv').style.display = 'none';
  document.getElementById('createGameDiv').style.display = 'block';
};
const validateUserNum = () => {
  const noOfPlayers = document.querySelector('#no-of-players').value;
  if (noOfPlayers < 7 && noOfPlayers > 2 && Number.isInteger(noOfPlayers)) {
    showErrorMessage('#userNumError', '');
    return true;
  }
  showErrorMessage(
    '#userNumError',
    'Please enter a number between 3 and 6. It should be an Integer.'
  );
  return false;
};

const validatePlayerName = () => {
  const playerName = document.querySelector('#player-name').value;
  if (playerName.length < 3) {
    showErrorMessage('#nameError', 'Name should be at least 3 characters.');
    return false;
  }
  showErrorMessage('#nameError', '');
  return true;
};

const showJoinPage = () => {
  document.getElementById('mainDiv').style.display = 'none';
  document.getElementById('joinGameDiv').style.display = 'block';
};

const showLoadingPage = buttonId => {
  document.getElementById(buttonId).parentNode.style.display = 'none';
  document.getElementById('loadingGameDiv').style.display = 'flex';
  const statusLine = document.getElementById('joined-players-status');
  statusLine.innerText = statusLine.innerText.replace('_player-ratio_', '2/3');
};

const showErrorMessage = function(id, msg) {
  document.querySelector(id).innerText = msg;
};

const confirmJoin = function({ hasJoined, roomFull }) {
  if (roomFull) {
    return showErrorMessage('#idError', 'Game has already started.');
  }
  if (hasJoined) {
    return location.assign('../waiting.html');
  }
  showErrorMessage('#idError', 'Invalid Game ID.');
};

const backToHomePage = buttonId => {
  document.getElementById(buttonId).parentNode.style.display = 'none';
  document.getElementById('mainDiv').style.display = 'flex';
};
