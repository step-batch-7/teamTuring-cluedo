'use strict';

const confirmMovement = function(response) {
  document.querySelectorAll('.tile').forEach(tile => {
    tile.classList.remove('highlightTile');
    tile.removeEventListener('click', movePlayer);
  });
  document.querySelectorAll('.room').forEach(room => {
    room.classList.remove('dullRoom');
    room.removeEventListener('click', movePlayer);
  });
  document.querySelector('.statusBar').innerText = '';
  updatePosition(response.positions);
};
