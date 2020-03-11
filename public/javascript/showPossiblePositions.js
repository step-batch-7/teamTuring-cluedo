'use strict';

const showPossiblePositions = function(possiblePositions) {
  document.querySelectorAll('.room').forEach(room => {
    room.style.background = 'rgb(211,211,211,0.3)';
  });

  possiblePositions.forEach(position => {
    const tiles = document.querySelectorAll(`.tile[id="${position}"]`);
    const rooms = document.querySelectorAll(`.room[id="${position}"]`);
    rooms.forEach(tile => {
      tile.style.background = 'none';
    });
    tiles.forEach(tile => {
      tile.style.opacity = 0.5;
    });
  });
};
