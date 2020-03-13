const assert = require('assert');
const { Player } = require('../lib/player');

describe('Player', function() {
  describe('move', () => {
    it('should move player to the given location', function() {
      const player1 = new Player(0, 'shankar', 'character', '1_1');
      player1.move('1_2');
      assert.deepStrictEqual(player1.getPosition(), '1_2');
    });
  });
  describe('changeMessage', () => {
    it('should change player message with the given message', function() {
      const player1 = new Player(0, 'ayush', 'character', '1_1');
      player1.changeMessage('welcome to cluedo');
      assert.deepStrictEqual(player1.getMessage(), 'welcome to cluedo');
    });
  });
  describe('getPosition', () => {
    it('Should give current position of the player', () => {
      const player = new Player(0, 'anil', 'scarlet', '8_25');
      assert.strictEqual(player.getPosition(), '8_25');
    });
  });
  describe('getMessage', () => {
    it('Should give the current message of the player', () => {
      const player = new Player(0, 'anil', 'scarlet', '8_25');
      player.changeMessage('welcome to cluedo');
      assert.strictEqual(player.getMessage(), 'welcome to cluedo');
    });
  });

  it('should give player current position', () => {
    const player1 = new Player(0, 'name', 'character', '1_1');
    assert.strictEqual(player1.getPosition(), '1_1');
  });
});
