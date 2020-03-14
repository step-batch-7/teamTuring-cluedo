'use strict';
const request = require('supertest');
const app = require('../lib/app');
const path = require('../data/paths.json');
const sinon = require('sinon');

describe('/', function () {
  it('should redirect to index.html page when the / is hit.', function (done) {
    request(app)
      .get('/')
      .expect('location', '/waiting.html')
      .expect(302, done);
  });
});

describe('/game.html', function () {
  it('should redirect to home.html when player have not joined or created game.', function (done) {
    request(app)
      .get('/game.html')
      .expect('location', '/index.html')
      .expect(302, done);
  });
});

describe('/abc', function () {
  it('should give not found for the bad url', function (done) {
    request(app)
      .get('/abc')
      .expect(404, done);
  });
});

describe('/game.css', function () {
  it('should load the css files ', function (done) {
    request(app)
      .get('/css/game.css')
      .expect('Content-Type', /text\/css*/)
      .expect(200, done);
  });
});

describe('/game.js', function () {
  it('should load the js files ', function (done) {
    request(app)
      .get('/javascript/game.js')
      .expect('Content-Type', /application\/javascript*/)
      .expect(200, done);
  });
});

describe('/createGame', function () {
  before(() => {
    const ourRandom = function () {
      return 0;
    };
    const date = 1583825482335;
    sinon.useFakeTimers(date);
    sinon.replace(Math, 'random', ourRandom);
  });

  it('should create a game', function (done) {
    request(app)
      .post('/createGame')
      .send({ noOfPlayers: 3, playerName: 'hey' })
      .expect(200, done);
  });
  after(() => {
    sinon.restore();
  });
});

describe('/waitingPageStatus', function () {
  it('after creating game number of players should be 1', function (done) {
    request(app)
      .get('/game/waitingPageStatus')
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

describe('/joinGame', function () {
  it('should not be able to join a game given id 1233', function (done) {
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '1233' })
      .expect({ hasJoined: false, roomFull: true })
      .expect(200, done);
  });

  it('should be able to join a game given id 10AA', function (done) {
    const ourRandom = function () {
      return 2;
    };
    const date = 1583825482335;
    sinon.useFakeTimers(date);
    sinon.replace(Math, 'random', ourRandom);
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '10AA' })
      .expect({ hasJoined: true, roomFull: false })
      .expect(200, done);
  });

  it('1 more player should be able to join', function (done) {
    const ourRandom = function () {
      return 3;
    };
    const date = 1583825482335;
    sinon.useFakeTimers(date);
    sinon.replace(Math, 'random', ourRandom);
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '10AA' })
      .expect({ hasJoined: true, roomFull: false })
      .expect(200, done);
  });

  it('none will be able to join after 3 player', function (done) {
    request(app)
      .post('/joinGame')
      .send({ playerName: 'ria', gameId: '10AA' })
      .expect({ hasJoined: false, roomFull: true })
      .expect(200, done);
  });
  afterEach(() => sinon.restore());
});

describe('/waiting.html', () => {
  it('Should get waiting page for given valid user', function (done) {
    request(app)
      .get('/game.html')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });
});

describe('/distributeCards', function () {
  it('after all players has joined it should distribute cards', function (done) {
    request(app)
      .get('/game/distributeCards')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });
  it('should not distribute after distributed once', function (done) {
    request(app)
      .get('/game/distributeCards')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });
});

describe('/getPlayersList', function () {
  it('should get all players details', function (done) {
    request(app)
      .get('/game/getPlayersList')
      .set('Cookie', 'sid=15838254823350')
      .expect([
        { character: 'scarlet', username: 'hey' },
        { character: 'mustard', username: 'ria' },
        { character: 'white', username: 'ria' }
      ])
      .expect(200, done);
  });
});

describe('/getPlayersPosition', function () {
  it('should give all players position', function (done) {
    request(app)
      .get('/game/getPlayersPosition')
      .set('Cookie', 'sid=15838254823350')
      .expect([
        { character: 'scarlet', position: '8_25' },
        { character: 'mustard', position: '1_18' },
        { character: 'white', position: '10_1' }
      ])
      .expect(200, done);
  });
});

describe('/myCards', function () {
  it('should able to see their card for a valid player', function (done) {
    request(app)
      .get('/game/myCards')
      .set('Cookie', 'sid=15838254823350')
      .expect(200, done);
  });

  it('should not be able to see their card for an invalid player', function (done) {
    request(app)
      .get('/game/myCards')
      .set('Cookie', '2001')
      .expect(403, done);
  });
});

describe('/rollDice', function () {
  it('should roll dice and give a values of both dices ', function (done) {
    Math.random = function () {
      return 1;
    };
    sinon.stub(Math, 'random');

    request(app)
      .get('/game/rollDice')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [6, 6] })
      .expect(200, done);
    sinon.restore();
  });
});

describe('/getGameStatus', function () {
  it('should give game status', function (done) {
    request(app)
      .get('/game/getGameStatus')
      .set('Cookie', 'sid=15838254823350')
      .expect({
        isPlayersTurn: true,
        activities: ['Game Started.'],
        canRollDice: true,
        action: 'hide',
        message: 'Your turn, roll dice.',
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

describe('/getPlayerName', function () {
  it('should load the player name', function (done) {
    request(app)
      .get('/game/getPlayerName')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json*/)
      .expect('"hey"')
      .expect(200, done);
  });
});

describe('/movePlayer', () => {
  it('Should move the player in side room', done => {
    request(app)
      .post('/game/movePlayer')
      .set('Cookie', 'sid=15838254823350')
      .send({ position: 'Lounge' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/Lounge/, done);
  });

  it('should roll dice in order move outside of room', function (done) {
    Math.random = function () {
      return 1;
    };
    sinon.stub(Math, 'random');

    request(app)
      .get('/game/rollDice')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [6, 6] })
      .expect(200, done);
    sinon.restore();
  });

  it('Should be able to move out of room', done => {
    request(app)
      .post('/game/movePlayer')
      .set('Cookie', 'sid=15838254823350')
      .send({ position: '4_17' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/4_17/, done);
  });
});

describe('/diceValueAndPossiblePositions', function () {
  it('Should give dice value and possible positions empty if dice is not rolled', function (done) {
    const expected = { diceValues: [], possiblePositions: [] };
    request(app)
      .get('/game/diceValueAndPossiblePositions')
      .set('Cookie', 'sid=15838254823350')
      .expect(expected)
      .expect(200, done);
  });

  it('Should roll dice to get possible positions', function (done) {
    Math.random = function () {
      return 0.3;
    };
    sinon.stub(Math, 'random');

    request(app)
      .get('/game/rollDice')
      .set('Cookie', 'sid=15838254823352')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [2, 2] })
      .expect(200, done);
    sinon.restore();
  });

  it('Should give dice value and possible positions for current player if dice is rolled', function (done) {
    const expected = { diceValues: [2, 2], possiblePositions: ['3_18', '2_17', '5_18', '4_19', '2_19'] };
    request(app)
      .get('/game/diceValueAndPossiblePositions')
      .set('Cookie', 'sid=15838254823352')
      .expect(expected)
      .expect(200, done);
  });

  it('Should give dice value and possible positions as empty for other player', function (done) {
    const expected = {
      diceValues: [],
      possiblePositions: []
    };
    request(app)
      .get('/game/diceValueAndPossiblePositions')
      .set('Cookie', 'sid=15838254823350')
      .expect(expected)
      .expect(200, done);
  });
});

describe('/getPossiblePositions', () => {
  it('should roll dice and give a values of both dices to get the possible positions', function (done) {
    Math.random = function () {
      return 0.3;
    };
    sinon.stub(Math, 'random');

    request(app)
      .get('/game/rollDice')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [2, 2] })
      .expect(200, done);
    sinon.restore();
  });
  it('Should give a list of possible positions and rooms when he/she is outside the room', done => {
    const expected = {
      possiblePositions: [
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
      ],
      isTurnChange: false
    };
    request(app)
      .get('/game/possiblePositions')
      .set('Cookie', 'sid=15838254823350')
      .expect(expected)
      .expect(200, done);
  });
  it('Should move the player in side room to test possibilities when he/she is inside room', done => {
    request(app)
      .post('/game/movePlayer')
      .set('Cookie', 'sid=15838254823350')
      .send({ position: 'DiningRoom' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/DiningRoom/, done);
  });
  it('should roll dice and give a values of both dices to get the positions to come out of room', function (done) {
    Math.random = function () {
      return 0.3;
    };
    sinon.stub(Math, 'random');

    request(app)
      .get('/game/rollDice')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json/)
      .expect({ values: [2, 2] })
      .expect(200, done);
    sinon.restore();
  });
  it('Should give a list of possible positions and rooms when he/she inside the room', done => {
    const expected = {
      possiblePositions: [
        '4_17',
        '5_18',
        '7_18',
        '6_19',
        '9_16',
        '10_17',
        '9_18',
        '8_19',
        '6_17',
        '8_17',
        'Lounge'
      ],
      isTurnChange: false
    };
    request(app)
      .get('/game/possiblePositions')
      .set('Cookie', 'sid=15838254823350')
      .expect(expected)
      .expect(200, done);
  });
});

describe('/getPath', function () {
  it('should get paths', function (done) {
    request(app)
      .get('/game/getPath')
      .set('Cookie', 'sid=15838254823350')
      .expect('Content-Type', /application\/json*/)
      .expect(path)
      .expect(200, done);
  });
});
