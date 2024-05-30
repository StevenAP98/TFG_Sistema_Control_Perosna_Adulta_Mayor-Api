// // Importar la función desde el archivo1.js
const UsuarioDal = require('../control-Adulto-Mayor.Dal/usuarioDal');
const  hat = require('hat');
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerUsuarios(){
    return UsuarioDal.obtenerUsuarios()
}

function obtenerUsuario(idUsuario){
  return UsuarioDal.obtenerUsuario(idUsuario)
}


async function agregarUsuario(usuario){
  usuario.contrasena=await encriptarContrasena(usuario.contrasena)

  return UsuarioDal.agregarUsuario(usuario)
}


async function actualizarUsuario(usuario){
  usuario.contrasena=await encriptarContrasena(usuario.contrasena)
  return UsuarioDal.actualizarUsuario(usuario)
}

function eliminarUsuario(idUsuario){
  return UsuarioDal.eliminarUsuario(idUsuario)
}

async function encriptarContrasena(contrasena) {
  try {
    const saltRounds = 10; // Número de rondas de hashing 
    const hash = await bcrypt.hash(contrasena, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
}

  // Exportar las funciones como un objeto
module.exports = {
    obtenerUsuario,
    obtenerUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    encriptarContrasena
};

  