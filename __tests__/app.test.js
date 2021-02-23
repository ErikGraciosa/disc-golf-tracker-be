const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const { getDefaultSettings } = require('http2');

describe('disc-golf-tracker-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
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
      id: '1'
    });
  });
});
