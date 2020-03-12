'use strict';
const request = require('supertest');
const app = require('../lib/app');
const sinon = require('sinon');

describe('/', function() {
  it('should redirect to index.html page when the / is hit.', function(done) {
    request(app)
      .get('/')
      .expect('location', '/waiting.html')
      .expect(302, done);
  });
});

describe('/index.html', function() {
  it('should redirect to home.html when player have not joined or created game.', function(done) {
    request(app)
      .get('/index.html')
      .expect('location', '/home.html')
      .expect(302, done);
  });
});

describe('/abc', function() {
  it('should give not found for the bad url', function(done) {
    request(app)
      .get('/abc')
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

describe('/createGame', function() {
  before(() => {
    const ourRandom = function() {
      return 0;
    };
    const date = 1583825482335;
    sinon.useFakeTimers(date);
    sinon.replace(Math, 'random', ourRandom);
  });

  it('should create a game', function(done) {
    request(app)
      .post('/createGame')
      .send({ noOfPlayers: 3, playerName: 'hey' })
      .expect(200, done);
  });
  after(() => {
    sinon.restore();
  });
});

describe('/checkNoOfPlayers', function() {
  it('after creating game number of players should be 1', function(done) {
    request(app)
      .get('/checkNoOfPlayers')
      .set('Cookie', 'sid=15838254823350')
      .expect({
        hasAllJoined: false,
        noOfPlayers: 1,
        totalPlayer: 3,
        gameId: '10AA',
        players: [{ character: 'scarlet', username: 'hey' }]
      })
      .expect(200, done);
  });
});

describe('/joinGame', function() {
  it('should not be able to join a game given id 1233', function(done) {
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '1233' })
      .expect({ hasJoined: false })
      .expect(200, done);
  });

  it('should be able to join a game given id 1234', function(done) {
    const ourRandom = function() {
      return 2;
    };
    const date = 1583825482335;
    sinon.useFakeTimers(date);
    sinon.replace(Math, 'random', ourRandom);
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '10AA' })
      .expect({ hasJoined: true })
      .expect(200, done);
    sinon.restore();
  });

  it('1 more player should be able to join', function(done) {
    const ourRandom = function() {
      return 3;
    };
    const date = 1583825482335;
    sinon.useFakeTimers(date);
    sinon.replace(Math, 'random', ourRandom);
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '10AA' })
      .expect({ hasJoined: true })
      .expect(200, done);
    sinon.restore();
  });

  it('none will be able to join after 3 player', function(done) {
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '10AA' })
      .expect({ roomFull: true })
      .expect(200, done);
  });

  after(() => {
    sinon.restore();
  });
});

describe('/distributeCards', function() {
  it('after all players has joined it should distribute cards', function(done) {
    request(app)
      .get('/distributeCards')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });
  it('should not distribute after distributed once', function(done) {
    request(app)
      .get('/distributeCards')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });
});

describe('/getPlayersList', function() {
  it('should get all players details', function(done) {
    request(app)
      .get('/getPlayersList')
      .set('Cookie', 'sid=15838254823350')
      .expect([
        { character: 'scarlet', username: 'hey' },
        { character: 'mustard', username: 'ria' },
        { character: 'white', username: 'ria' }
      ])
      .expect(200, done);
  });
});

describe('/getPlayersPosition', function() {
  it('should give all players position', function(done) {
    request(app)
      .get('/getPlayersPosition')
      .set('Cookie', 'sid=15838254823350')
      .expect([
        { character: 'scarlet', position: '8_25' },
        { character: 'mustard', position: '1_18' },
        { character: 'white', position: '10_1' }
      ])
      .expect(200, done);
  });
});

describe('/myCards', function() {
  it('should able to see their card for a valid player', function(done) {
    request(app)
      .get('/myCards')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });

  it('should not be able to see their card for an invalid player', function(done) {
    request(app)
      .get('/myCards')
      .set('Cookie', '2001')
      .expect(302, done);
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
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [6, 6] })
      .expect(200, done);
    sinon.restore();
  });
});
describe('/getGameStatus', function() {
  it('should give game status', function(done) {
    request(app)
      .get('/getGameStatus')
      .set('Cookie', 'sid=15838254823350')
      .expect({
        isPlayersTurn: true,
        activities: ['scarlet rolled dice and got 12.'],
        canRollDice: true,
        message: 'your turn, roll dice',
        positions: [
          {
            character: 'scarlet',
            position: '8_25'
          },
          {
            character: 'mustard',
            position: '1_18'
          },
          {
            character: 'white',
            position: '10_1'
          }
        ]
      })
      .expect(200, done);
  });
});
describe('/getPlayerName', function() {
  it('should load the player name', function(done) {
    request(app)
      .get('/getPlayerName')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json*/)
      .expect('"hey"')
      .expect(200, done);
  });
});

describe('/movePlayer', () => {
  it('Should move the player in side room', done => {
    request(app)
      .post('/movePlayer')
      .set('Cookie', 'sid=15838254823350')
      .send({ position: 'Lounge' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/Lounge/, done);
  });

  it('should roll dice in order move outside of room', function(done) {
    Math.random = function() {
      return 1;
    };
    sinon.stub(Math, 'random');

    request(app)
      .get('/rollDice')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [6, 6] })
      .expect(200, done);
    sinon.restore();
  });

  it('Should be able to move out of room', done => {
    request(app)
      .post('/movePlayer')
      .set('Cookie', 'sid=15838254823350')
      .send({ position: '4_17' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/4_17/, done);
    sinon.restore();
  });
});

describe('getPossiblePositions', () => {
  it('Should give a list of possible positions and rooms when he/she is outside the room', done => {
    const possibilities = [
      '3_18',
      '2_19',
      '2_17',
      '5_18',
      '4_19',
      'DiningRoom',
      '8_17',
      '7_18',
      '6_19',
      '6_17'
    ];
    request(app)
      .post('/possiblePositions')
      .set('Cookie', 'sid=15838254823350')
      .send({ diceValue: 4 })
      .expect(possibilities)
      .expect(200, done);
    sinon.restore();
  });
  it('Should move the player in side room to test possibilities when he/she is inside room', done => {
    request(app)
      .post('/movePlayer')
      .set('Cookie', 'sid=15838254823350')
      .send({ position: 'DiningRoom' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/DiningRoom/, done);
  });
  it('Should give a list of possible positions and rooms when he/she inside the room', done => {
    const possibilities = ['6_17', '8_17', '7_18'];
    request(app)
      .post('/possiblePositions')
      .set('Cookie', 'sid=15838254823350')
      .send({ diceValue: 2 })
      .expect(possibilities)
      .expect(200, done);
    sinon.restore();
  });
});

describe('/getGameStatus', function() {
  it('should give is your turn false after your turn', function(done) {
    request(app)
      .get('/getGameStatus')
      .set('Cookie', 'sid=15838254823350')
      .expect({
        isPlayersTurn: true,
        activities: [
          'scarlet has entered Dining Room.',
          'scarlet has came out of Lounge.',
          'scarlet rolled dice and got 12.',
          'scarlet has entered Lounge.',
          'scarlet rolled dice and got 12.'
        ],
        canRollDice: false,
        message: 'Select a position to move',
        positions: [
          {
            character: 'scarlet',
            position: 'DiningRoom'
          },
          {
            character: 'mustard',
            position: '1_18'
          },
          {
            character: 'white',
            position: '10_1'
          }
        ]
      })
      .expect(200, done);
  });
});

describe('/changeTurn', function() {
  it('should change the turn of player', function(done) {
    request(app)
      .get('/changeTurn')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json*/)
      .expect(200, done);
  });
});

describe('/getGameStatus', function() {
  it('should give is your turn false after your turn', function(done) {
    request(app)
      .get('/getGameStatus')
      .set('Cookie', 'sid=15838254823350')
      .expect({
        isPlayersTurn: false,
        activities: [
          'scarlet has entered Dining Room.',
          'scarlet has came out of Lounge.',
          'scarlet rolled dice and got 12.',
          'scarlet has entered Lounge.',
          'scarlet rolled dice and got 12.'
        ],
        canRollDice: false,
        message: `mustard'${'s'} turn`,
        positions: [
          {
            character: 'scarlet',
            position: 'DiningRoom'
          },
          {
            character: 'mustard',
            position: '1_18'
          },
          {
            character: 'white',
            position: '10_1'
          }
        ]
      })
      .expect(200, done);
  });
});
