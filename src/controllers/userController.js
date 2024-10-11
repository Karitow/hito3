import * as sql from '../models/User.models.js'
import { jwtSign } from '../util/jwt.js'
import { hashPass, comparePass } from '../util/bcrypt.js'

export const register = (req,res) => {
  hashPass(req.body.contraseña)
    .then(hashedPass => sql.register(req.body, hashedPass))
    .then(result => {
      if (result.code) {
      res.status(500).json({ status:false, code:500, message: 'No se ha podido registrar usuario'})
      return 
    }
      res.status(201).json({status: true, code:201, message: 'Usuario creado'})
})
  .catch(error=> res.status(500).json({status:false, code:500, message: error.message}))
}

export const login = (req, res) => {
  const { email, contraseña} = req.body
  sql.login({ email })
   .then(usuarios => {
    if (usuarios.length === 0){
      res.status(401).json({ status:false, code: 401, message: 'Usuario y/o contraseña incorrectas'})
      return 
    }
    const usuario = usuarios[0]
    return comparePass(contraseña, usuario.contraseña)
     .then(contraseñaMatch => {
      if(!contraseñaMatch) {
        res.status(401).json({ status: false, code:401, message: 'Usuario y/o contraseña incorrectas'})
        return
       } 

       const token = jwtSign(usuario.email)
       res.status(200).json({ status:true, code:200, message: { token }})
   })
})
  .catch(error => {
    res.status(500).json({ status: false, code: 500, message: error.message })
  })
}

export const findProfile = (req, res) => sql.findProfile(req.usuario)
  .then((result) => res.status(200).json({ status: true, code:200, message: result}))
  .catch((error) => res.status(500).json({ status:false, code:500, message: error }))

export const updateProfile = (req, res) => {
  if (req.body.contraseña) {
    hashPass(req.body.contraseña)
    .then(hashedPass=> sql.updateProfile(req.params.id, req.body, hashedPass))
    .then((result) => res.status(200).json({ status: true, code:200, message: result}))
    .catch((error) => res.status(500).json({ status:false, code:500, message: error}))
    } else {
      sql.updateProfile(req.params.id, req.body)
      .then((result) => res.status(200).json({status: true, code:200, message: result}))
      .catch((error) => res.status(500).json({status:false, code:500, message:error}))
    }
  }

export const deleteProfile = (req, res) => sql.deleteProfile(req.params.id)
  .then((result) => res.status(200).json({ status:true, code:200, message: result}))
  .catch((error) => res.status(500).json({ status:false, code:500, message:error}))
