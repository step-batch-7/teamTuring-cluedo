'use strict';

const Game = require('../lib/game');
const assert = require('assert');
const sinon = require('sinon');

// eslint-disable-next-line max-statements
describe('Game', () => {
  describe('nextPlayerId getter', () => {
    it('Should give new id for next player', () => {
      const game = new Game(1);
      assert.strictEqual(game.nextPlayerId, 0);
    });
  });
  describe('addPlayer', () => {
    it('Should add the new player into game with given name when all player are not joined', () => {
      const game = new Game(1);
      const actual = game.addPlayer('turing');
      assert.deepStrictEqual(actual, { roomFull: false, hasJoined: true });
    });
    it('Should not add the new player into game when all player are joined', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      const actual = game.addPlayer('shankar');
      assert.deepStrictEqual(actual, { roomFull: true, hasJoined: false });
    });
  });
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
  describe('updateDiceValue', () => {
    it('Should update the dice value with the given values', () => {
      const game = new Game(1);
      const diceValues = [1, 1];
      game.updateDiceValue(diceValues);
      assert.deepStrictEqual(game.getDiceValues(), diceValues);
    });
  });
  describe('getActivityLog', () => {
    it('Should give the activity log of the game', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      game.addActivity(0, 'has rolled the dice and got 0');
      const expected = [
        'Scarlet has rolled the dice and got 0.',
        'Game Started.'
      ];
      assert.deepStrictEqual(game.getActivityLog(), expected);
    });
  });
  describe('addActivity', () => {
    it('Should add the activity with given player name', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      game.addActivity(0, 'has rolled the dice and got 0');
      const expected = [
        'Scarlet has rolled the dice and got 0.',
        'Game Started.'
      ];
      assert.deepStrictEqual(game.getActivityLog(), expected);
    });
  });
  describe('getDiceValues', () => {
    it('Should give the dice values of the game', () => {
      const game = new Game(1);
      const diceValues = [1, 1];
      game.updateDiceValue(diceValues);
      assert.deepStrictEqual(game.getDiceValues(), diceValues);
    });
  });
  describe('getPossiblePositions', () => {
    it('should give all the possible positions based on the diceValue', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      game.updateDiceValue([1, 1]);
      const actual = game.getPossiblePositions(0);
      const expected = ['8_23', '9_24'];
      assert.deepStrictEqual(actual, expected);
    });
    it('should give all the possible positions with rooms based on the diceValue', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      game.updateDiceValue([5, 5]);
      const actual = game.getPossiblePositions(0);
      const expected = [
        'Lounge',
        '4_19',
        '5_18',
        '6_17',
        '7_18',
        '6_19',
        'DiningRoom',
        '8_17',
        '9_18',
        '9_16',
        '10_17',
        '11_18',
        '9_20',
        '9_22',
        '8_19',
        '9_24',
        '8_21',
        '8_23'
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('Should not give any possible positions when there is no diceValue', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      assert.deepStrictEqual(game.getPossiblePositions(0), []);
    });
    it('should change the turn if you can not move anywhere', () => {
      const game = new Game(2);
      game.addPlayer('turing');
      game.addPlayer('shankar');
      game.movePlayer(1, '8_24');
      game.updateDiceValue([1, 1]);
      assert.deepStrictEqual(game.getPossiblePositions(0), []);
      assert.ok(game.isPlayersTurn(0));
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
  describe('getPlayerName', () => {
    it('Should give the player name for the given player id', () => {
      const game = new Game(1);
      const playerName = 'turing';
      game.addPlayer(playerName);
      assert.strictEqual(game.getPlayerName(0), playerName);
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
    after(() => sinon.restore());
  });
  describe('hasAllJoined', () => {
    it('Should give true when all players are joined the game', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      assert.ok(game.hasAllJoined());
    });
    it('Should give false when all players are not joined the game', () => {
      const game = new Game(2);
      game.addPlayer('turing');
      assert.ok(!game.hasAllJoined());
    });
  });
  describe('changeMessage', () => {
    it('Should change the message of the given player with given message', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      const message = 'wait for your turn.';
      game.changeMessage(0, message);
      assert.deepStrictEqual(game.getMessage(0), message);
    });
  });
  describe('isPlayerTurn', () => {
    it('Should give true if it is his turn and change the message as Your turn, roll dice.', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      game.updateDiceValue([1, 1]);
      const actual = game.isPlayersTurn(0);
      assert.ok(actual);
      assert.strictEqual(game.getMessage(0), 'Your turn, roll dice.');
    });
    it('Should give true if it is his turn and should not change his message', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      game.updateDiceValue([1, 1]);
      game.blockRollingDice();
      const actual = game.isPlayersTurn(0);
      assert.ok(actual);
      assert.strictEqual(game.getMessage(0), '');
    });
    it('Should give false if it is not his turn and should change message as current players turn', () => {
      const game = new Game(2);
      game.addPlayer('turing');
      game.addPlayer('rajesh');
      game.updateDiceValue([1, 1]);
      const actual = game.isPlayersTurn(1);
      assert.ok(!actual);
      assert.strictEqual(game.getMessage(1), "Scarlet's turn.");
    });
  });
  describe('currentPlayerCharacter', () => {
    it('Should give the capitalized character name of the current Player', () => {
      const game = new Game(1);
      game.addPlayer('turing');
      assert.strictEqual(game.currentPlayerCharacter(), 'Scarlet');
    });
  });
  describe('getMessage', () => {
    it('Should give the message of the given player', () => {
      const game = new Game(1);
      const message = 'wait for your turn.';
      game.addPlayer('turing');
      game.changeMessage(0, message);
      assert.strictEqual(game.getMessage(0), message);
    });
  });
  describe('blockRollingDice', () => {
    it('Should change the diceRollable to false', () => {
      const game = new Game(1);
      game.blockRollingDice();
      assert.ok(!game.diceRollable);
    });
  });
});
