import 'dotenv/config';
import request from 'supertest';
import app from '../src/server/app.js';
import { describe, test, expect } from 'vitest';

const USER_VALID_LOGIN = { email: 'juanito@test.com', password: '1234' };
const NEW_ORDER = { userId: 1, items: [{ productId: 1, quantity: 2 }], totalAmount: 100 };
const UPDATED_ORDER = { status: 'completed' };
const ORDER_ID = 1;

describe('CRUD operations of orders', () => {
  let token;

  beforeAll(async () => {
    const loginResponse = await request(app).post('/restobuApi/users/login').send(USER_VALID_LOGIN);
    token = loginResponse.body.message.token;
  });

  test('[POST] /restobuApi/orders | It should return 201 when order is successfully created', async () => {
    const response = await request(app).post('/restobuApi/orders').set('Authorization', `Bearer ${token}`).send(NEW_ORDER);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(true);
  });

  test('[GET] /restobuApi/orders/:orderId | It should return 200 and the order details', async () => {
    const response = await request(app).get(`/restobuApi/orders/${ORDER_ID}`).set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test('[PUT] /restobuApi/orders/:orderId | It should return 200 when order is successfully updated', async () => {
    const response = await request(app).put(`/restobuApi/orders/${ORDER_ID}`).set('Authorization', `Bearer ${token}`).send(UPDATED_ORDER);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test('[DELETE] /restobuApi/orders/:orderId | It should return 200 when order is successfully deleted', async () => {
    const response = await request(app).delete(`/restobuApi/orders/${ORDER_ID}`).set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
  });
});
