const assert = require('assert');
const { Player } = require('../lib/player');

describe('Player', function() {
  it('should move player', function() {
    const player1 = new Player(0, 'name', 'character', '1_1');
    player1.move('1_2');
    assert.deepStrictEqual(player1.getPosition(), '1_2');
  });
  it('should change message', function() {
    const player1 = new Player(0, 'name', 'character', '1_1');
    player1.changeMessage('hallo sir');
    assert.deepStrictEqual(player1.getMessage(), 'hallo sir');
  });
});
