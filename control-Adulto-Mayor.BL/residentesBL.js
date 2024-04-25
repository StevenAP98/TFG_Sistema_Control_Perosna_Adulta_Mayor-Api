// // Importar la función desde el archivo1.js
const ResidenteDal = require('../control-Adulto-Mayor.Dal/residentesDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerResidentes(){
    return ResidenteDal.obtenerResidentes()
}

function obtenerResidente(idResidente){
  return ResidenteDal.obtenerResidente(idResidente)
}


async function agregarResidente(usuario){

  return ResidenteDal.agregarResidente(usuario)
}


async function actualizarResidente(usuario){
  return ResidenteDal.actualizarResidente(usuario)
}

function eliminarResidente(idResidente){
  return ResidenteDal.eliminarResidente(idResidente)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerResidente,
    obtenerResidentes,
    agregarResidente,
    actualizarResidente,
    eliminarResidente,
};

  