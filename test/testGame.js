'use strict';

const Game = require('../lib/game');
const assert = require('assert');

describe('Game', () => {
  describe('getPlayersPosition', () => {
    it('Should give all the players position', () => {
      const game = new Game();
      const actual = game.getPlayersPosition();
      const expected = [
        {
          character: 'scarlet',
          position: '8_25'
        },
        {
          character: 'mustard',
          position: '1_18'
        },
        {
          character: 'white',
          position: '10_1'
        },
        {
          character: 'green',
          position: '15_1'
        },
        {
          character: 'peacock',
          position: '24_7'
        },
        {
          character: 'plum',
          position: '24_20'
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
