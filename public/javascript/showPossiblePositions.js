'use strict';

const showPossiblePositions = function({ possiblePositions, isTurnChange }) {
  if (isTurnChange) {
    updateStatusBar('You are blocked, You can nor move.');
    changeTurn();
    return;
  }
  const rooms = document.querySelectorAll('.room');
  rooms.forEach(room => room.classList.add('dullRoom'));
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
