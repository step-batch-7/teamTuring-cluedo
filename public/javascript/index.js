const path = [
  '8_2',
  '9_2',
  '10_2',
  '15_2',
  '16_2',
  '17_2',
  '7_3',
  '8_3',
  '17_3',
  '18_3',
  '7_4',
  '8_4',
  '17_4',
  '18_4',
  '7_5',
  '8_5',
  '17_5',
  '18_5',
  '7_6',
  '8_6',
  '17_6',
  '18_6',
  '19_6',
  '7_7',
  '8_7',
  '17_7',
  '18_7',
  '19_7',
  '20_7',
  '21_7',
  '22_7',
  '23_7',
  '1_8',
  '2_8',
  '3_8',
  '4_8',
  '5_8',
  '6_8',
  '7_8',
  '8_8',
  '17_8',
  '18_8',
  '19_8',
  '20_8',
  '21_8',
  '22_8',
  '23_8',
  '2_9',
  '3_9',
  '4_9',
  '5_9',
  '6_9',
  '7_9',
  '8_9',
  '9_9',
  '10_9',
  '11_9',
  '12_9',
  '13_9',
  '14_9',
  '15_9',
  '16_9',
  '17_9',
  '18_9',
  '6_10',
  '7_10',
  '8_10',
  '9_10',
  '10_10',
  '11_10',
  '12_10',
  '13_10',
  '14_10',
  '15_10',
  '16_10',
  '17_10',
  '18_10',
  '9_11',
  '10_11',
  '16_11',
  '17_11',
  '18_11',
  '9_12',
  '10_12',
  '16_12',
  '17_12',
  '18_12',
  '9_13',
  '10_13',
  '16_13',
  '17_13',
  '18_13',
  '9_14',
  '10_14',
  '16_14',
  '17_14',
  '18_14',
  '19_14',
  '20_14',
  '21_14',
  '22_14',
  '23_14',
  '9_15',
  '10_15',
  '16_15',
  '17_15',
  '18_15',
  '9_16',
  '10_16',
  '16_16',
  '17_16',
  '2_17',
  '3_17',
  '4_17',
  '5_17',
  '6_17',
  '7_17',
  '8_17',
  '9_17',
  '10_17',
  '16_17',
  '17_17',
  '2_18',
  '3_18',
  '4_18',
  '5_18',
  '6_18',
  '7_18',
  '8_18',
  '9_18',
  '10_18',
  '11_18',
  '12_18',
  '13_18',
  '14_18',
  '15_18',
  '16_18',
  '17_18',
  '2_19',
  '3_19',
  '4_19',
  '5_19',
  '6_19',
  '7_19',
  '8_19',
  '9_19',
  '16_19',
  '17_19',
  '18_19',
  '8_20',
  '9_20',
  '16_20',
  '17_20',
  '18_20',
  '19_20',
  '20_20',
  '21_20',
  '22_20',
  '23_20',
  '8_21',
  '9_21',
  '16_21',
  '17_21',
  '18_21',
  '19_21',
  '20_21',
  '21_21',
  '22_21',
  '23_21',
  '8_22',
  '9_22',
  '16_22',
  '17_22',
  '8_23',
  '9_23',
  '16_23',
  '17_23',
  '8_24',
  '9_24',
  '16_24',
  '17_24',
  '17_25'
];

const initializePlayersPosition = () => {
  const playersPosition = ['8_25', '1_18', '10_1', '15_1', '24_7', '24_20'];
  const grid = document.querySelector('.grid');
  playersPosition.forEach(position => {
    const posTemplate = document.createElement('div');
    posTemplate.classList.add('startingPoint');
    posTemplate.id = `${position}`;
    grid.appendChild(posTemplate);
  });
};

const loadPath = () => {
  const grid = document.querySelector('.grid');
  path.forEach(tile => {
    const tileTemplate = document.createElement('div');
    tileTemplate.classList.add('tile');
    tileTemplate.addEventListener('click', movePlayer);
    tileTemplate.id = `${tile}`;
    grid.appendChild(tileTemplate);
  });
};

const updatePosition = playersPosition => {
  playersPosition.forEach(({ character, position }) => {
    const grid = document.getElementById(position);
    const html = `<div class="${character}">
    <i class="fas fa-map-marker"></i></div>`;
    grid.innerHTML = html;
  });
};

const generatePlayerList = response => {
  const { playersList } = response;
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

const displayName = function(name) {
  const profileName = document.querySelector('#profile-name');
  profileName.innerText = name;
};

const main = () => {
  loadPath();
  initializePlayersPosition();
  updatePlayersPosition();
  getPlayerList();
  displayPlayerName();
};
