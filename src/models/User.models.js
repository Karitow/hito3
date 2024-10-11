import db from '../database/db.js'

export const register = ({ nombre, email, contraseña}) => db('INSERT INTO usuarios (id, nombre, email, contraseña) VALUES (DEFAULT, $1, $2, $3);', [nombre, email, contraseña ]);

export const login = ({ email}) => db('SELECT email, contraseña FROM usuarios WHERE email=$1;',[email]);

export const findProfile = (email) => db('SELECT id, nombre, email FROM usuarios WHERE email =$1', [email]);

export const deleteProfile = (id) => db('DELETE FROM usuarios WHERE id = $1 RETURNING *;',[id]);

export const updateProfile = (id, {nombre, email, contraseña}) => db('UPDATE usuarios SET nombre =$2, email=$3, contraseña=$4 WHERE id=$1;', [id, nombre, email, contraseña])