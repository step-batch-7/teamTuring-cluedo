const showHostGame = () => {
  document.getElementById('mainDiv').style.display = 'none';
  document.getElementById('createGameDiv').style.display = 'block';
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
    return showErrorMessage('#error-join', 'Game has already started.');
  }
  if (hasJoined) {
    return location.assign('../waiting.html');
  }
  showErrorMessage('#error-join', 'Invalid Game ID.');
};

const backToHomePage = buttonId => {
  document.getElementById(buttonId).parentNode.style.display = 'none';
  document.getElementById('mainDiv').style.display = 'flex';
};
