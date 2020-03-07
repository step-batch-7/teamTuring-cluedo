const sendRequest = function(method, url, msg, handler) {
  const request = new XMLHttpRequest();
  request.onload = function() {
    handler(JSON.parse(this.responseText));
  };
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(msg));
};

const getDicesValue = () => {
  sendRequest('GET', '/rollDice', {}, updateDiceFace);
};

const updatePlayersPosition = function() {
  sendRequest('GET', '/getPlayersPosition', {}, updatePosition);
};

const movePlayer = () => {
  const element = event.target;
  sendRequest('POST', '/movePlayer', { position: element.id }, confirmMovement);
};
