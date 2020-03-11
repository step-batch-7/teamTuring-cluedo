'use strict';

const confirmMovement = function(response) {
  if (!response.hasMoved) {
    return alert('sorry can not move there');
  }
  document.querySelectorAll('.highlightTile').forEach(tile => {
    tile.classList.remove('highlightTile');
    tile.removeEventListener('click', movePlayer);
  });
  document.querySelectorAll('.dullRoom').forEach(room => {
    room.classList.remove('dullRoom');
    room.removeEventListener('click', movePlayer);
  });
  document.querySelector(`.${response.player}`).parentElement.innerHTML = '';
  updatePosition(response.positions);
};
