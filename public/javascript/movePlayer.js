'use strict';

const confirmMovement = function(response) {
  if (!response.hasMoved) {
    return alert('sorry can not move there');
  }
  document.querySelector('.scarlet').parentElement.innerHTML = '';
  updatePosition(response.positions);
};
