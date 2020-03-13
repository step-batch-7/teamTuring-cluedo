const updateWaitingPage = function(details) {
  const status = document.querySelector('#joined-players-status');
  status.innerText = ` Players Joined
  ${details.noOfPlayers}/${details.totalPlayer}`;
  const gameId = document.querySelector('#game-id');
  gameId.innerText = `Game Id: ${details.gameId}`;
  const message = document.querySelector('#message');
  message.innerHTML = details.players.reduce((msg, player) => {
    return msg + `<p>${player.username} - (${player.character})</p>`;
  }, '');
};

const waitingPageStatus = function() {
  sendRequest('GET', '/game/waitingPageStatus', {}, gameDetails => {
    updateWaitingPage(gameDetails);
    if (gameDetails.hasAllJoined) {
      sendRequest('GET', '/game/distributeCards', {}, () => {});
      setTimeout(() => location.assign('../game.html'), 2000);
    }
  });
};

const wait = function() {
  setInterval(waitingPageStatus, 1000);
};
