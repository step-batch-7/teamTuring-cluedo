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

  describe('/getPlayersPosition', function() {
    before(() => {
      sinon.replace(app.locals.game, 'getPlayersPosition', function() {
        return [{ character: 'abc', position: '1' }];
      });
    });
    it('should give the initial positions of players', function(done) {
      request(app)
        .get('/getPlayersPosition')
        .expect([{ character: 'abc', position: '1' }])
        .expect(200, done);
    });
    sinon.restore();
  });

  describe('/getPlayersList', function() {
    before(() => {
      sinon.replace(app.locals.game, 'getPlayersList', function() {
        return [{ character: 'abc', name: 'efg' }];
      });
    });
    it('should return all the players character and username', function(done) {
      request(app)
        .get('/getPlayersList')
        .expect([{ character: 'abc', name: 'efg' }])
        .expect(200, done);
    });
    sinon.restore();
  });

  describe('/myCards', function() {
    before(() => {
      sinon.replace(app.locals.game, 'getCards', function() {
        return ['plum', 'rope', 'kitchen'];
      });
    });

    it('should return list of all the cards of the player', function(done) {
      request(app)
        .get('/myCards')
        .expect(['plum', 'rope', 'kitchen'])
        .expect(200, done);
    });
    sinon.restore();
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

  describe('/getPlayerName', function() {
    it('should load the player name', function(done) {
      request(app)
        .get('/getPlayerName')
        .expect('Content-Type', /application\/json*/)
        .expect(/turing/gi)
        .expect(200, done);
    });
  });
});

describe('POST', () => {
  describe('/movePlayer', () => {
    it('Should move the player in side room', done => {
      request(app)
        .post('/movePlayer')
        .send({ position: 'Lounge' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(/true/, done);
    });
    it('Should not move the player have not rolled the dice', done => {
      request(app)
        .post('/movePlayer')
        .send({ position: '8_24' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(/false/, done);
    });
    it('Should be able to move out of room', done => {
      app.locals.game.diceValues = [1, 1];
      request(app)
        .post('/movePlayer')
        .send({ position: '7_18' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(/true/, done);
      sinon.restore();
    });
  });
});
