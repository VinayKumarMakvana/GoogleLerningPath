import request from 'supertest';
import app from '../src/app';

describe('Health Check API', () => {
  it('should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'UP',
      message: 'API is healthy',
    });
  });
});
