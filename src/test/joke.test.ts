// test.ts

//const server = require('./index.tx');     // cjs
import app from '../server.js'
//const supertest = require('supertest');   // cjs
import supertest from 'supertest'
const requestWithSupertest = supertest(app);

describe('User Endpoints', () => {
  it('GET /joke/random fetches a random joke', async () => {
    const res = await requestWithSupertest.get('/joke/random');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('joke')
  });

  it(`GET /joke/:category fetches a joke from a category`, async () => {
    const res = await requestWithSupertest.get('/joke/career')
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('joke')
  });

  it(`GET /joke/:category fetches a joke from a category that does not exist`, async () => {
    const res = await requestWithSupertest.get('/joke/fish')
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('categories')
  });
});