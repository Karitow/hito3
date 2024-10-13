import db from '../database/db.js';

export const registerUser = ({ nombre, email, contraseña }) => {
  return db.query('INSERT INTO Usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *', [nombre, email, contraseña]);
};

export const loginUser = (email) => {
  return db.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
};

export const findProfile = (email) => {
  return db.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
};

export const updateProfile = (id, updatedData) => {
  const { nombre, email, contraseña } = updatedData;
  return db.query('UPDATE Usuarios SET nombre = $1, email = $2, contraseña = $3 WHERE id = $4 RETURNING *', [nombre, email, contraseña, id]);
};

export const deleteProfile = (id) => {
  return db.query('DELETE FROM Usuarios WHERE id = $1 RETURNING *', [id]);
};
