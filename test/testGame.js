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

  describe('getPlayersPosition', () => {
    it('Should give all the players list with character and name', () => {
      const game = new Game();
      const actual = game.getPlayersList();
      const expected = [
        {
          username: 'Turing',
          character: 'scarlet'
        },
        {
          username: 'Naveen',
          character: 'mustard'
        },
        {
          username: 'Shankar',
          character: 'white'
        },
        {
          username: 'Anil',
          character: 'green'
        },
        {
          username: 'Trinankur',
          character: 'peacock'
        },
        {
          username: 'Ayush',
          character: 'plum'
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('updateDiceValue', () => {
    it('Should should update diceValue with given data', () => {
      const game = new Game();
      const diceValue = [1, 2];
      game.updateDiceValue(diceValue);
      assert.deepStrictEqual(game.getDiceValue(), diceValue);
    });
  });

  describe('movePlayer', () => {
    it('Should give true if player moves', () => {
      const game = new Game();
      game.updateDiceValue([1, 1]);
      assert.ok(game.movePlayer('8_23'));
      const expected = [
        {
          character: 'scarlet',
          position: '8_23'
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
      assert.deepStrictEqual(game.getPlayersPosition(), expected);
    });
    it('Should give false if player does not moves', () => {
      const game = new Game();
      game.updateDiceValue([3, 3]);
      assert.ok(!game.movePlayer('8_24'));
    });
  });

  describe('getCards', () => {
    it('Should return list of cards matching for the given player', () => {
      const game = new Game();
      const actual = game.getCards(1);
      const expected = ['plum', 'rope', 'kitchen'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
