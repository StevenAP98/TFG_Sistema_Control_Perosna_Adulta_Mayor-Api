// // Importar la función desde el archivo1.js
const UsuarioDal = require('../control-Adulto-Mayor.Dal/usuarioDal');
const  hat = require('hat');
// Llamar a la función

function obtenerUsuarios(){
    return UsuarioDal.obtenerUsuarios()
}

function obtenerUsuario(idUsuario){
  return UsuarioDal.obtenerUsuario(idUsuario)
}


function agregarUsuario(usuario){
  return UsuarioDal.agregarUsuario(usuario)
}


function actualizarUsuario(usuario){
  return UsuarioDal.actualizarUsuario(usuario)
}

function eliminarUsuario(idUsuario){
  return UsuarioDal.eliminarUsuario(idUsuario)
}

async function autenticacion(datosAuthValidar){

  var resultado=await UsuarioDal.autenticacion(datosAuthValidar);

  if(resultado.ObjetoRespuesta.length > 0){
      var token = hat();
      await UsuarioDal.actualizarTokenUsuario(resultado.ObjetoRespuesta[0].idUsuario,token);
    
      resultado.ObjetoRespuesta = {
        token:token,
        idUsuario:resultado.ObjetoRespuesta[0].idUsuario,
        autenticado:true
      }


  }else{
    resultado.ObjetoRespuesta={
      autenticado:false
    }
  }

  return resultado
}
async function verificacion(datosAuthValidar){

  var resultado=await UsuarioDal.verificacion(datosAuthValidar);

  if(resultado.ObjetoRespuesta.length > 0){

      resultado.ObjetoRespuesta = {
        verificado:true
      }

  }else{
    resultado.ObjetoRespuesta={
      verificado:false
    }
  }

  return resultado
}



  // Exportar las funciones como un objeto
module.exports = {
    obtenerUsuario,
    obtenerUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    autenticacion,
    verificacion
};

  