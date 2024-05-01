import app from '../src/app';
import request from 'supertest';

describe('GET /', () => {
    test('It should respond with "Hello World"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World');
        expect(response.status).toBe(200);
    }
    );
});

