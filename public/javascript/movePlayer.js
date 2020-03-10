'use strict';

const confirmMovement = function(response) {
  if (!response.hasMoved) {
    return alert('sorry can not move there');
  }
  document.querySelector(`.${response.player}`).parentElement.innerHTML = '';
  updatePosition(response.positions);
};
