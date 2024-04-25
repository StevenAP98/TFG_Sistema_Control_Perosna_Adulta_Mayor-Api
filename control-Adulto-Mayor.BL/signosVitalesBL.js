// // Importar la función desde el archivo1.jscirugia
const SignosVitalesDal = require('../control-Adulto-Mayor.Dal/signosVitalesDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerSignosVitalesXIdResidente(idResidente){
    return SignosVitalesDal.obtenerSignosVitalesXIdResidente(idResidente)
}

function obtenerSignosVitales(idSignosVitales){
  return SignosVitalesDal.obtenerSignosVitales(idSignosVitales)
}


async function agregarSignosVitales(usuario){

  return SignosVitalesDal.agregarSignosVitales(usuario)
}


async function actualizarSignosVitales(usuario){
  return SignosVitalesDal.actualizarSignosVitales(usuario)
}

function eliminarSignosVitales(idSignosVitales){
  return SignosVitalesDal.eliminarSignosVitales(idSignosVitales)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerSignosVitales,
    obtenerSignosVitalesXIdResidente,
    agregarSignosVitales,
    actualizarSignosVitales,
    eliminarSignosVitales,
};

  