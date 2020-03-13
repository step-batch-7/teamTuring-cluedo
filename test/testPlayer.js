const assert = require('assert');
const { Player } = require('../lib/player');

describe('Player', function() {
  it('should move player to the given location', function() {
    const player1 = new Player(0, 'name', 'character', '1_1');
    player1.move('1_2');
    assert.deepStrictEqual(player1.getPosition(), '1_2');
  });
  it('should change player message with the given message', function() {
    const player1 = new Player(0, 'name', 'character', '1_1');
    player1.changeMessage('hello sir');
    assert.deepStrictEqual(player1.getMessage(), 'hello sir');
  });
});
