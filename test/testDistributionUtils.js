const assert = require('assert');
const sinon = require('sinon');
const { shuffle, selectConfidential } = require('../lib/distributionUtils');

describe('shuffle', function() {
  const fake = () => 0.2;
  before(() => {
    sinon.replace(Math, 'random', fake);
  });
  it('should shuffle a list of cards', function() {
    const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const actual = shuffle(list);
    assert.deepStrictEqual(actual, [
      'e',
      'j',
      'i',
      'h',
      'g',
      'f',
      'd',
      'c',
      'b',
      'a'
    ]);
  });
  after(() => {
    sinon.restore();
  });
});

describe('selectConfidential', function() {
  const fake = () => 0;
  before(() => {
    sinon.replace(Math, 'random', fake);
  });
  it('should separate the confidential cards from total', function() {
    const rooms = ['r1', 'r2', 'r3', 'r4'];
    const weapons = ['w1', 'w2', 'w3', 'w4'];
    const characters = ['c1', 'c2', 'c3', 'c4'];
    const actual = selectConfidential(rooms, weapons, characters);
    assert.deepStrictEqual(actual, {
      confidential: ['r1', 'w1', 'c1'],
      rest: ['r2', 'r3', 'r4', 'w2', 'w3', 'w4', 'c2', 'c3', 'c4']
    });
  });
  after(() => {
    sinon.restore();
  });
});
