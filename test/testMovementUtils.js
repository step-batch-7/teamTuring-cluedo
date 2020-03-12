const { getValidPositions } = require('../lib/movementUtility');
const assert = require('assert');

describe('getValidPositions', function() {
  it('should be get all possible positions based on dice value', function() {
    assert.deepStrictEqual(
      ['8_23', '9_24'],
      getValidPositions([], { position: '8_25' }, 2)
    );
  });
  it('should get position considering all doors given the players starting position is in room', function() {
    assert.deepStrictEqual(
      ['17_5', '18_6', '17_7', '9_9', '11_9', '10_10'],
      getValidPositions([], { position: 'Ballroom' }, 2)
    );
  });
  it('should be able to get possible rooms in range', function() {
    assert.deepStrictEqual(getValidPositions([], { position: '8_25' }, 9), [
      'Lounge',
      '5_19',
      '6_18',
      '7_17',
      '8_18',
      '7_19',
      '9_17',
      '10_18',
      '9_19',
      '9_21',
      '9_23',
      '8_20',
      '8_22'
    ]);
  });
  it('should not get positions which blocked', function() {
    assert.deepStrictEqual(
      getValidPositions(['8_24'], { position: '8_25' }, 2),
      []
    );
  });
  it('should not get any position if blocked inside room', function() {
    assert.deepStrictEqual(
      getValidPositions(['7_19'], { position: 'Lounge' }, 2),
      []
    );
  });
});
