// // Importar la función desde el archivo1.jscirugia
const fisioterapiaDal = require('../control-Adulto-Mayor.Dal/fisioterapiaDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerFisioterapiaXIdRecidente(idResidente){
    return fisioterapiaDal.obtenerFisioterapiaXIdRecidente(idResidente)
}

function obtenerFisioterapia(idSignosVitales){
  return fisioterapiaDal.obtenerFisioterapia(idSignosVitales)
}


async function agregarFisioterapia(usuario){

  return fisioterapiaDal.agregarFisioterapia(usuario)
}


async function actualizarFisioterapia(usuario){
  return fisioterapiaDal.actualizarFisioterapia(usuario)
}

function eliminarFisioterapia(idSignosVitales){
  return fisioterapiaDal.eliminarFisioterapia(idSignosVitales)
}


  // Exportar las funciones como un objeto
module.exports = {
  obtenerFisioterapiaXIdRecidente,
  obtenerFisioterapia,
  agregarFisioterapia,
  actualizarFisioterapia,
  eliminarFisioterapia,
};

  