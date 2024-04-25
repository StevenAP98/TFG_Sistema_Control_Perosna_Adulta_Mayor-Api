// // Importar la función desde el archivo1.jscirugia
const CirugiaDal = require('../control-Adulto-Mayor.Dal/cirugiasDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerCirugiasXIdResidente(idResidente){
    return CirugiaDal.obtenerCirugiasXIdResidente(idResidente)
}

function obtenerCirugia(idCirugia){
  return CirugiaDal.obtenerCirugia(idCirugia)
}


async function agregarCirugia(usuario){

  return CirugiaDal.agregarCirugia(usuario)
}


async function actualizarCirugia(usuario){
  return CirugiaDal.actualizarCirugia(usuario)
}

function eliminarCirugia(idCirugia){
  return CirugiaDal.eliminarCirugia(idCirugia)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerCirugia,
    obtenerCirugiasXIdResidente,
    agregarCirugia,
    actualizarCirugia,
    eliminarCirugia,
};

  