const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Round = require('../lib/models/Round');

describe('disc-golf-tracker-be routes', () => {
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    return Round.createRound({
      date: String(Date.now()),
      location: 'Pier Park',
      name: 'Spongebob',
      strokes: 66,
      notes: 'windy and rainy'
    });
  });

  afterAll(() => {
    return pool.end();
  });

  it('POST for a round', async() => {

    const singleRound = {
      date: String(Date.now()),
      location: 'Pier Park',
      name: 'James Bond',
      strokes: 54,
      notes: 'windy and rainy'
    };

    const response = await request(app)
      .post('/api/v1/rounds')
      .send(singleRound);

    expect(response.body).toEqual({
      ...singleRound,
      id: expect.any(String)
    });
  });

  it('GET all rounds', async() => {

    const response = await request(app)
      .get('/api/v1/rounds');
      
    expect(response.body).toEqual([{
      date: expect.any(String),
      location: 'Pier Park',
      name: 'Spongebob',
      strokes: 66,
      notes: 'windy and rainy',
      id: expect.any(String)
    }]);
  });


});
