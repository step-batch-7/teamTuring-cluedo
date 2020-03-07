'use strict';
const request = require('supertest');
const app = require('../lib/app');
const sinon = require('sinon');

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

  describe('/rollDice', function() {
    it('should roll dice and give a values of both dices ', function(done) {
      Math.random = function() {
        return 1;
      };
      sinon.stub(Math, 'random');

      request(app)
        .get('/rollDice')
        .expect('Content-Type', /application\/json/)
        .expect({ values: [6, 6] })
        .expect(200, done);
      sinon.restore();
    });
  });
});
