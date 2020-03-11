'use strict';

const showPossiblePositions = function(possiblePositions) {
  const rooms = document.querySelectorAll('.room');
  rooms.forEach(room => room.classList.add('dullRoom'));
  document.querySelector('.statusBar').innerText = 'Select a position to move';
  possiblePositions.forEach(position => {
    const tiles = document.querySelectorAll(`.tile[id="${position}"]`);
    const rooms = document.querySelectorAll(`.room[id="${position}"]`);
    rooms.forEach(room => {
      room.addEventListener('click', movePlayer);
      room.classList.remove('dullRoom');
    });
    tiles.forEach(tile => {
      tile.addEventListener('click', movePlayer);
      tile.classList.add('highlightTile');
    });
  });
};
