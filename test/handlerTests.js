'use strict';
const request = require('supertest');
const app = require('../lib/app');

describe('GET', function() {
  describe('/ or /index.html', function() {
    it('should load the game page when the / is hit.', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /text\/html*/)
        .expect(200, done);
    });
  });
  describe('/abc', function() {
    it('should give not found for the bad url', function(done) {
      request(app)
        .get('/abc')
        .expect('Content-Type', /text\/html*/)
        .expect(404, done);
    });
  });
  describe('/game.css', function() {
    it('should load the css files ', function(done) {
      request(app)
        .get('/css/game.css')
        .expect('Content-Type', /text\/css*/)
        .expect(200, done);
    });
  });
  describe('/index.js', function() {
    it('should load the js files ', function(done) {
      request(app)
        .get('/javascript/index.js')
        .expect('Content-Type', /application\/javascript*/)
        .expect(200, done);
    });
  });

  describe('/getPlayersPosition', function() {
    beforeEach(() => {
      app.locals.game.getPlayersPosition = function() {
        return [{ character: 'abc', position: '1' }];
      };
    });
    it('should give the initial positions of players', function(done) {
      request(app)
        .get('/getPlayersPosition')
        .expect([{ character: 'abc', position: '1' }])
        .expect(200, done);
    });
  });

  describe('/rollDice', function() {
    it('should roll dice and give a values of both dices ', function(done) {
      request(app)
        .get('/rollDice')
        .expect('Content-Type', /application\/json/)
        .expect(/value/)
        .expect(200, done);
    });
  });
});
