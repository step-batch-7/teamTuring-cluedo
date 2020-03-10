const checkNoOfPlayer = function() {
  sendRequest('GET', '/checkNoOfPlayers', {}, data => {
    const status = document.querySelector('#joined-players-status');
    status.innerText = `${data.noOfPlayers}/${data.totalPlayer} Player Joined`;
    if (data.hasAllJoined) {
      sendRequest('GET', '/distributeCards', {}, () => {});
      location.assign('../index.html');
    }
  });
};

const wait = function() {
  setInterval(checkNoOfPlayer, 1000);
};
