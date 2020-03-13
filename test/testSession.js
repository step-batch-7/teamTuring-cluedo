const assert = require('assert');
const Session = require('../lib/session');

describe('Session', () => {
  describe('create', () => {
    const session = new Session();
    it('should create a new session for corresponding to the cookie,gameId,playerId.', () => {
      assert.strictEqual(session.create('12345', '10AB', '6'), '12345');
      assert.deepStrictEqual(session.getUser('12345'), {
        playerId: '10AB',
        gameId: '6'
      });
    });
  });

  describe('isSessionAlive', () => {
    const session = new Session();
    it('should give true if the user session is existing.', () => {
      session.create('12345', '10AB', '6');
      assert.deepStrictEqual(session.isSessionAlive('12345'), true);
    });

    it('should give false if the user session is not existing.', () => {
      const session = new Session();
      session.create('12345', '10AB', '6');
      assert.deepStrictEqual(session.isSessionAlive('12346'), false);
    });
  });
});
