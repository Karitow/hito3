import db from '../database/db.js';

export const createProduct = ({ nombre, descripcion, precio, imagen_url }) => {
  return db.query('INSERT INTO Productos (nombre, descripcion, precio, imagen_url) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, descripcion, precio, imagen_url]);
};

export const getProduct = (productId) => {
  return db.query('SELECT * FROM Productos WHERE id = $1', [productId]);
};

export const updateProduct = (productId, updatedData) => {
  const { nombre, descripcion, precio, imagen_url } = updatedData;
  return db.query('UPDATE Productos SET nombre = $1, descripcion = $2, precio = $3, imagen_url = $4 WHERE id = $5 RETURNING *', [nombre, descripcion, precio, imagen_url, productId]);
};

export const deleteProduct = (productId) => {
  return db.query('DELETE FROM Productos WHERE id = $1 RETURNING *', [productId]);
};
