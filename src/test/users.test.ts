// test.ts

//const server = require('./index.tx');     // cjs
import app from '../server.js'
//const supertest = require('supertest');   // cjs
import supertest from 'supertest'
const requestWithSupertest = supertest(app);

describe('User Endpoints', () => {
  it('GET /user should show all users', async () => {
    const res = await requestWithSupertest.get('/users');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('users')
  });

});