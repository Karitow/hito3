import db from '../database/db.js';

export const createOrder = (userId, items, totalAmount) => {
  return db('INSERT INTO orders (user_id, items, total_amount) VALUES ($1, $2, $3) RETURNING *;', [userId, items, totalAmount]);
};

export const getOrder = (orderId) => {
  return db('SELECT * FROM orders WHERE id = $1;', [orderId]);
};

export const getAllOrders = (userId) => {
  return db('SELECT * FROM orders WHERE user_id = $1;', [userId]);
};

export const updateOrder = (orderId, status) => {
  return db('UPDATE orders SET status = $2 WHERE id = $1 RETURNING *;', [orderId, status]);
};

export const deleteOrder = (orderId) => {
  return db('DELETE FROM orders WHERE id = $1 RETURNING *;', [orderId]);
};
