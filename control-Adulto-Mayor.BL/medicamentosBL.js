// // Importar la función desde el archivo1.jscirugia
const MedicamentoDal = require('../control-Adulto-Mayor.Dal/medicamentosDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');
const usuarioDal = require('../control-Adulto-Mayor.Dal/usuarioDal')

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

function obtenerDosisDiaria(dosisDiaria){
  return MedicamentoDal.obtenerDosisDiaria(dosisDiaria)
}

async function agregarDosisDiaria(dosisDiaria){
  await descontarStock("agregar", dosisDiaria)
  dosisDiaria.aplicador= await obtenerAplicador(dosisDiaria);

  //Se agrega la dosis
  return MedicamentoDal.agregarDosisDiaria(dosisDiaria)
}


async function actualizarDosisDiaria(dosisDiaria){
  await descontarStock("actualizar", dosisDiaria)
  dosisDiaria.aplicador= await obtenerAplicador(dosisDiaria);

  return MedicamentoDal.actualizarDosisDiaria(dosisDiaria)
}

async function eliminarDosisDiaria(idDosisDiaria){
  dosisDiaria= await MedicamentoDal.obtenerDosisDiaria({idFiltro:"idDosisDiaria", id:idDosisDiaria})

  await descontarStock("eliminar",dosisDiaria.ObjetoRespuesta[0])
  return MedicamentoDal.eliminarDosisDiaria(idDosisDiaria)
}


async function descontarStock(tipo, dosisDiaria){
  console.log("primerConsole")
  console.log(tipo)
  console.log(dosisDiaria)

  var medicamentoXRecidente = await MedicamentoDal.obtenerMedicamentosXResidenteXId(dosisDiaria.idMedicamentoXRecidente==undefined?dosisDiaria.idMedicamentoXResidente:dosisDiaria.idMedicamentoXRecidente);
  var anteriorStockConsumido =  medicamentoXRecidente[0].stockConsumido;


  if(tipo == "actualizar"){
    //Se actualiza el stock consumido sumandole la cantidad diaria
    var cantidadAnterior = await (await MedicamentoDal.obtenerDosisDiaria({id:dosisDiaria.idDosisDiaria, idTipo:"IDD"})).ObjetoRespuesta[0].cantidad;
    var diferencia =  parseInt(dosisDiaria.cantidad) - parseInt(cantidadAnterior)
    var nuevoStockConsumido = parseInt(anteriorStockConsumido) + parseInt(diferencia);

    //Se actualiza el stock ocupado
    var diferenciaStockOcupado = parseInt(nuevoStockConsumido) - parseInt(anteriorStockConsumido)
    var nuevoStokOcupado= parseInt(medicamentoXRecidente[0].stokOcupado) - parseInt(diferenciaStockOcupado)

  }else if(tipo=="agregar"){
    var nuevoStockConsumido = parseInt(anteriorStockConsumido) + parseInt(dosisDiaria.cantidad);
    var nuevoStokOcupado= parseInt(medicamentoXRecidente[0].stokOcupado) - parseInt(dosisDiaria.cantidad)

  }else if(tipo=="eliminar"){
    var cantidadAnterior = dosisDiaria.cantidad
    var nuevoStockConsumido = parseInt(anteriorStockConsumido) - parseInt(cantidadAnterior);
    var nuevoStokOcupado= parseInt(medicamentoXRecidente[0].stokOcupado) + parseInt(cantidadAnterior)


  }
  MedicamentoDal.actualizarStockConsumido(nuevoStockConsumido, dosisDiaria.idMedicamentoXRecidente==undefined?dosisDiaria.idMedicamentoXResidente:dosisDiaria.idMedicamentoXRecidente, nuevoStokOcupado);  
}

async function obtenerAplicador(dosisDiaria){
  //Se obtiene el usuario que aplico la dosis
  var aplicador= await usuarioDal.obtenerUsuario(dosisDiaria.idUsuario)
  return aplicador.ObjetoRespuesta[0].nombre + " " + aplicador.ObjetoRespuesta[0].apellidos;

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
    obtenerMedicamentos,
    obtenerDosisDiaria,
    agregarDosisDiaria,
    actualizarDosisDiaria,
    eliminarDosisDiaria
};

  