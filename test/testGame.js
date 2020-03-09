'use strict';

const Game = require('../lib/game');
const assert = require('assert');

describe('Game', () => {
  let game = {};
  before(() => {
    const players = [
      {
        id: 1,
        name: 'Turing',
        character: 'scarlet',
        position: '8_25',
        cards: ['plum', 'rope', 'kitchen']
      }
    ];
    game = new Game(players, [], 1);
  });
  describe('getPlayersPosition', () => {
    it('Should give all the players position', () => {
      const actual = game.getPlayersPosition();
      const expected = [
        {
          character: 'scarlet',
          position: '8_25'
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('getPlayersList', () => {
    it('Should give all the players list with character and name', () => {
      const actual = game.getPlayersList();
      const expected = [
        {
          username: 'Turing',
          character: 'scarlet'
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('updateDiceValue', () => {
    it('Should should update diceValue with given data', () => {
      const diceValue = [1, 2];
      game.updateDiceValue(diceValue);
      assert.deepStrictEqual(game.getDiceValue(), diceValue);
    });
  });

  describe('movePlayer', () => {
    it('Should give true if player moves', () => {
      game.updateDiceValue([1, 1]);
      assert.ok(game.movePlayer('8_23'));
      const expected = [
        {
          character: 'scarlet',
          position: '8_23'
        }
      ];
      assert.deepStrictEqual(game.getPlayersPosition(), expected);
    });
    it('Should give false if player does not moves', () => {
      game.updateDiceValue([3, 3]);
      assert.ok(!game.movePlayer('8_24'));
    });
  });

  describe('getCards', () => {
    it('Should return list of cards matching for the given player', () => {
      const actual = game.getCards(1);
      const expected = ['plum', 'rope', 'kitchen'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
