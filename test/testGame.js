'use strict';

const Game = require('../lib/game');
const assert = require('assert');
const sinon = require('sinon');

describe('Game', () => {
  describe('getPlayersPosition', () => {
    it('should get all player position after adding', function() {
      const game = new Game(1);
      game.addPlayer('turing');
      const expected = [{ character: 'scarlet', position: '8_25' }];
      assert.deepStrictEqual(game.getPlayersPosition(), expected);
    });
  });

  describe('getPlayersList', () => {
    it('Should give all the players list with character and name', () => {
      const game = new Game(1);
      game.addPlayer('Turing');
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

  describe('movePlayer', () => {
    it('Should give true if player moves', () => {
      const game = new Game(1);
      game.addPlayer('Turing');
      game.updateDiceValue([1, 1], 0);
      const actual = game.movePlayer(0, '8_23');
      const expected = {
        player: 'scarlet'
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give false if player does not moves', () => {
      const game = new Game();
      game.addPlayer('turing');
      game.updateDiceValue([3, 3], 0);
      const actual = game.movePlayer(0, '8_23');
      const expected = {
        player: 'scarlet'
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('getCards', () => {
    const fake = () => 0;
    before(() => {
      sinon.replace(Math, 'random', fake);
    });
    it('should get card after distribution among players', () => {
      const game = new Game(3);
      game.addPlayer('neha');
      game.addPlayer('anil');
      game.addPlayer('phani');
      game.distribute();
      assert.deepStrictEqual(game.getCards(0), [
        'green',
        'white',
        'rope',
        'dagger',
        'lounge',
        'billiardRoom'
      ]);
      assert.deepStrictEqual(game.getCards(1), [
        'peacock',
        'mustard',
        'revolver',
        'diningRoom',
        'library',
        'conservatory'
      ]);
      assert.deepStrictEqual(game.getCards(2), [
        'plum',
        'wrench',
        'leadPipe',
        'studyRoom',
        'hall',
        'ballRoom'
      ]);
    });
  });
});
