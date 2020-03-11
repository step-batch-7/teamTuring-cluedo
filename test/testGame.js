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
      const game = new Game(1);
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

  describe('getPossiblePositions', () => {
    it('should give all the possible positions based on the diceValue', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      const actual = game.getPossiblePositions(0, 2);
      const expected = ['8_23', '9_24'];
      assert.deepStrictEqual(actual, expected);
    });
    it('should give all the possible positions with rooms based on the diceValue', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      const actual = game.getPossiblePositions(0, 10);
      const expected = ['Lounge', '4_19', '5_18', '6_17', '7_18', '6_19', 'DiningRoom', '8_17', '9_18', '9_16', '10_17', '11_18', '9_20', '9_22', '8_19', '9_24', '8_21', '8_23'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
