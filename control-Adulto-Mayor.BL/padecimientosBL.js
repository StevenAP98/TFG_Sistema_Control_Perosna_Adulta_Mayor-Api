// // Importar la función desde el archivo1.jspadecimiento
const PadecimientoDal = require('../control-Adulto-Mayor.Dal/padecimientosDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerPadecimientosXIdResidente(idResidente){
    return PadecimientoDal.obtenerPadecimientosXIdResidente(idResidente)
}

function obtenerPadecimiento(idPadecimiento){
  return PadecimientoDal.obtenerPadecimiento(idPadecimiento)
}


async function agregarPadecimiento(usuario){

  return PadecimientoDal.agregarPadecimiento(usuario)
}


async function actualizarPadecimiento(usuario){
  return PadecimientoDal.actualizarPadecimiento(usuario)
}

function eliminarPadecimiento(idPadecimiento){
  return PadecimientoDal.eliminarPadecimiento(idPadecimiento)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerPadecimiento,
    obtenerPadecimientosXIdResidente,
    agregarPadecimiento,
    actualizarPadecimiento,
    eliminarPadecimiento,
};

  