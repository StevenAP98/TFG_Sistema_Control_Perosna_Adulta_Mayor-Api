// // Importar la función desde el archivo1.jscirugia
const MedicamentoDal = require('../control-Adulto-Mayor.Dal/medicamentosDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');

// Llamar a la función
function obtenerMedicamentosXIdResidente(idResidente){
    return MedicamentoDal.obtenerMedicamentosXIdResidente(idResidente)
}
function obtenerMedicamentosXResidente(idMedicamento){
  return MedicamentoDal.obtenerMedicamentosXResidente(idMedicamento)
}

function agregarMedicamentosXResidente(medicamentoXResidente){
  return MedicamentoDal.agregarMedicamentosXResidente(medicamentoXResidente)
}

function actualizarMedicamentosXResidente(medicamentoXResidente){
  return MedicamentoDal.actualizarMedicamentosXResidente(medicamentoXResidente)
}

function eliminarMedicamentosXResidente(idMedicamento){
  return MedicamentoDal.eliminarMedicamentosXResidente(idMedicamento)
}

function obtenerMedicamentos(){
  return MedicamentoDal.obtenerMedicamentos()
}


function obtenerMedicamento(idMedicamento){
  return MedicamentoDal.obtenerMedicamento(idMedicamento)
}


async function agregarMedicamento(usuario){

  return MedicamentoDal.agregarMedicamento(usuario)
}


async function actualizarMedicamento(usuario){
  return MedicamentoDal.actualizarMedicamento(usuario)
}

function eliminarMedicamento(idMedicamento){
  return MedicamentoDal.eliminarMedicamento(idMedicamento)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerMedicamento,
    obtenerMedicamentosXIdResidente,
    obtenerMedicamentosXResidente,
    agregarMedicamentosXResidente,
    actualizarMedicamentosXResidente,
    eliminarMedicamentosXResidente,
    agregarMedicamento,
    actualizarMedicamento,
    eliminarMedicamento,
    obtenerMedicamentos
};

  