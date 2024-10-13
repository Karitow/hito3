import db from '../database/db.js';

export const createOrder = (userId, items, totalAmount) => {
  return db.query('INSERT INTO Pedidos (usuario_id, total) VALUES ($1, $2) RETURNING *', [userId, totalAmount])
    .then(result => {
      const orderId = result.rows[0].id;
      const values = items.map(item => `(${orderId}, ${item.productId}, ${item.quantity})`).join(',');
      return db.query(`INSERT INTO Carrito_producto (carrito_id, producto_id, cantidad) VALUES ${values}`);
    });
};

export const getOrder = (orderId) => {
  return db.query('SELECT * FROM Pedidos WHERE id = $1', [orderId]);
};

export const updateOrder = (orderId, status) => {
  return db.query('UPDATE Pedidos SET status = $1 WHERE id = $2 RETURNING *', [status, orderId]);
};

export const deleteOrder = (orderId) => {
  return db.query('DELETE FROM Pedidos WHERE id = $1 RETURNING *', [orderId]);
};
