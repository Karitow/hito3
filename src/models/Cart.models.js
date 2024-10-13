import db from '../database/db.js';

export const addToCart = (usuarioId, productoId, cantidad) => {
  return db('INSERT INTO carrito (usuario_id, product_id, cantidad) VALUES ($1, $2, $3) RETURNING *;', [usuarioId, productoId, cantidad]);
};

export const getCart = (usuarioId) => {
  return db('SELECT * FROM carrito WHERE usuario_id = $1;', [usuarioId]);
};

export const removeFromCart = (usuarioId, productoId) => {
  return db('DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2 RETURNING *;', [usuarioId, productoId]);
};
