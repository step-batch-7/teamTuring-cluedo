'use strict';

const Game = require('../lib/game');
const assert = require('assert');

describe('Game', () => {
  describe('getPlayersPosition', () => {
    it('Should give all the players position', () => {
      const game = new Game();
      const actual = game.getPlayersPosition();
      const expected = ['8_25', '1_18', '10_1', '15_1', '24_7', '24_20'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
