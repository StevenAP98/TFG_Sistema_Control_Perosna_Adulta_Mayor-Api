// // Importar la función desde el archivo1.jscita
const CitaDal = require('../control-Adulto-Mayor.Dal/citasDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerCitasXIdResidente(idResidente){
    return CitaDal.obtenerCitasXIdResidente(idResidente)
}

function obtenerCita(idCita){
  return CitaDal.obtenerCita(idCita)
}


async function agregarCita(usuario){

  return CitaDal.agregarCita(usuario)
}


async function actualizarCita(usuario){
  return CitaDal.actualizarCita(usuario)
}

function eliminarCita(idCita){
  return CitaDal.eliminarCita(idCita)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerCita,
    obtenerCitasXIdResidente,
    agregarCita,
    actualizarCita,
    eliminarCita,
};

  