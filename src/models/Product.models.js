import db from '../database/db.js';

// Obtener todos los productos
export const getProducts = () => {
  return db.query('SELECT * FROM productos');
};

// Crear un nuevo producto
export const createProduct = (product) => {
  const { title, price, descripcion, stock, imageUrl, categoria } = product;
  return db.query(
    'INSERT INTO productos (nombre, descripcion, stock, image_url, categoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, price, descripcion, stock, imageUrl, categoria]
  );
};

// Actualizar un producto existente
export const updateProduct = (id, product) => {
  const { title, price, description, stock, imageUrl, category } = product;
  return db.query(
    'UPDATE products SET title = $1, price = $2, description = $3, stock = $4, image_url = $5, category = $6 WHERE id = $7 RETURNING *',
    [title, price, description, stock, imageUrl, category, id]
  );
};

// Eliminar un producto
export const deleteProduct = (id) => {
  return db.query('DELETE FROM Productos WHERE id = $1 RETURNING *', [id]);
};
