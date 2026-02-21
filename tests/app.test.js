const request = require('supertest');
const app = require('../src/app');

describe('App endpoints', () => {
  describe('GET /health', () => {
    it('responds with status ok', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });

  describe('GET /api/hello', () => {
    it('returns hello message', async () => {
      const response = await request(app).get('/api/hello');
      expect(response.body).toHaveProperty('message', 'hello');
    });

    it('accepts name parameter', async () => {
      const response = await request(app).get('/api/hello?name=FitTrack');
      expect(response.body).toHaveProperty('message', 'hello FitTrack');
    });
  });
});
