const initializePlayersPosition = () => {
  const playersPosition = ['8_25', '1_18', '10_1', '15_1', '24_7', '24_20'];
  const grid = document.querySelector('.grid');
  playersPosition.forEach(position => {
    const posTemplate = document.createElement('div');
    posTemplate.classList.add('startingPoint');
    posTemplate.id = position;
    grid.appendChild(posTemplate);
  });
};

const loadPath = (path) => {
  const grid = document.querySelector('.grid');
  path.forEach(tile => {
    const tileTemplate = document.createElement('div');
    tileTemplate.classList.add('tile');
    tileTemplate.id = tile;
    grid.appendChild(tileTemplate);
  });
};

const assignPlayerPosition = playersPosition => {
  playersPosition.forEach(({ character, position }) => {
    const grid = document.getElementById(position);
    const temp = document.createElement('div');
    temp.innerHTML = `<div class="${character}">
    <i class="fas fa-map-marker"></i></div>`;
    grid.appendChild(temp.firstChild);
  });
};

const removePlayerPosition = playersPosition => {
  playersPosition.forEach(({ character }) => {
    const element = document.querySelector(`.${character}`);
    element.parentElement.removeChild(element);
  });
};

const updatePosition = playersPosition => {
  removePlayerPosition(playersPosition);
  assignPlayerPosition(playersPosition);
};

const generatePlayerList = playersList => {
  const players = document.querySelector('.players');
  playersList.forEach(function(playerInfo) {
    const playerCard = createPlayerCard(playerInfo);
    return players.appendChild(playerCard);
  });
};

const createPlayerCard = playerInfo => {
  const player = document.createElement('div');
  player.classList.add('player');
  player.id = playerInfo.character;
  player.innerHTML = `
    <div class="avatar">
      <img src="./images/playersCharacterFaces/${playerInfo.character}.jpg" />
      <div class="name">${playerInfo.character}</div>
    </div>
    <div class="user">${playerInfo.username}</div>`;
  return player;
};

const createCard = function(card) {
  const cardContent = document.createElement('div');
  cardContent.classList.add('card');
  cardContent.innerHTML = `<div><img src="./images/cards/${card}.jpg" /></div>`;
  return cardContent;
};

const addClassActive = function(id) {
  const tabs = document.querySelectorAll('.tabsContent');
  for (let tab = 0; tab < tabs.length; tab++) {
    tabs[tab].classList.remove('active');
  }
  const element = document.querySelector(`#${id}`);
  element.classList.add('active');
};

const showTab = function(id) {
  const logContent = document.getElementsByClassName('logContent');
  addClassActive(id);
  for (let content = 0; content < logContent.length; content++) {
    logContent[content].style.display = 'none';
  }
  const element = document.querySelector(`#${id}Content`);
  element.style.display = 'flex';
};

const addActivity = function(activities) {
  const activityContent = document.querySelector('#activityLogsContent');
  let activityDivs = '';
  activities.forEach(activity => {
    const newAct = document.createElement('div');
    newAct.classList.add('activity');
    newAct.innerHTML = activity;
    activityDivs = activityDivs.concat(newAct.outerHTML);
  });
  activityContent.innerHTML = activityDivs;
};
const clearMsg = function(id) {
  document.getElementById(id).innerHTML = '';
};

const activatePlayer = function(playerStatus) {
  const gameBoard = document.querySelector('.grid');
  gameBoard.classList.add('block');
  if (playerStatus) {
    gameBoard.classList.remove('block');
  }
};

const toggleDiceRolling = function(diceStatus) {
  const dices = document.querySelector('#dices');
  dices.classList.add('block');
  if (diceStatus) {
    dices.classList.remove('block');
  }
};

const updateStatusBar = function(message) {
  const statusBar = document.querySelector('.statusBar');
  statusBar.style.display = 'flex';
  statusBar.innerText = message;
};

const changeStatus = function(status) {
  addActivity(status.activities);
  activatePlayer(status.isPlayersTurn);
  toggleDiceRolling(status.canRollDice);
  updateStatusBar(status.message);
  updatePosition(status.positions);
};

const displayMyCards = function(cardsList) {
  const myCards = document.querySelector('.cards');
  cardsList.forEach(function(card) {
    const cardContent = createCard(card);
    return myCards.appendChild(cardContent);
  });
};

const displayName = function(name) {
  const profileName = document.querySelector('#profile-name');
  profileName.innerText = name;
};

const updateGameStatus = function() {
  setInterval(() => {
    getGameStatus();
  }, 1000);
};

const main = () => {
  requestPath();
  initializePlayersPosition();
  updatePlayersPosition();
  getPlayerList();
  getMyCards();
  displayPlayerName();
  updateGameStatus();
  getDicesValueAndPossiblePositions();
};
