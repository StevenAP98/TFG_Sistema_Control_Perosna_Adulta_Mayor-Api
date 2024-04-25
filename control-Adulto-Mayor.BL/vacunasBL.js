// // Importar la función desde el archivo1.js
const VacunaDal = require('../control-Adulto-Mayor.Dal/vacunasDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerVacunasXIdResidente(idResidente){
    return VacunaDal.obtenerVacunasXIdResidente(idResidente)
}

function obtenerVacuna(idVacuna){
  return VacunaDal.obtenerVacuna(idVacuna)
}


async function agregarVacuna(usuario){

  return VacunaDal.agregarVacuna(usuario)
}


async function actualizarVacuna(usuario){
  return VacunaDal.actualizarVacuna(usuario)
}

function eliminarVacuna(idVacuna){
  return VacunaDal.eliminarVacuna(idVacuna)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerVacuna,
    obtenerVacunasXIdResidente,
    agregarVacuna,
    actualizarVacuna,
    eliminarVacuna,
};

  