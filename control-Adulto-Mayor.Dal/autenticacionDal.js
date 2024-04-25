const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');


async function obtenerDatosinicioSesion(datosAuth) {
    var resultado = new Respuesta ();
  
    try {   
      
      var usuario = await db.query(`SELECT * FROM "Schema-datos"."Usuarios" WHERE "nombreUsuario" = '${datosAuth.nombreUsuario}'`)
      resultado.ObjetoRespuesta =usuario;
      resultado.HayError = false;
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
    return resultado
    
  }

  async function cerrarSesion(idUsuario) {
    var resultado = new Respuesta ();
    try {   
  
      db.query(`
      UPDATE "Schema-datos"."Usuarios"
      SET   
        token=''
      WHERE 
        "idUsuario"=${idUsuario};
    `)
  
      resultado.HayError = false; 
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado 
  }
  

  async function verificarUsuario(datosAuth) {
    var resultado = new Respuesta ();
  
    try {   
      var usuario = await db.query(`SELECT * FROM "Schema-datos"."Usuarios" WHERE "idUsuario" = '${datosAuth.idUsuario}' and token = '${datosAuth.token}'`)
      resultado.ObjetoRespuesta =usuario;
      resultado.HayError = false;
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
    return resultado
    
  }
  
function actualizarTokenUsuario(idUsuario, token) {
    var resultado = new Respuesta ();
  
    try {   
  
      db.query(`
      UPDATE "Schema-datos"."Usuarios"
      SET   
        token='${token}'
      WHERE 
        "idUsuario"=${idUsuario};
    `)
  
      resultado.HayError = false;
      resultado.Mensaje="Usuario actualizado exitosamente"    
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado
  }
  
  function actualizarContrasena(idUsuario, contrasena, esContrasenaTemporal) {
    var resultado = new Respuesta ();
  
    try {   
  
      db.query(`
      UPDATE "Schema-datos"."Usuarios"
      SET   
        contrasena='${contrasena}',
        "contrasenaTemporal"='${esContrasenaTemporal}'
      WHERE 
        "idUsuario"=${idUsuario};
    `)
  
      resultado.HayError = false;
      resultado.Mensaje="Usuario actualizado exitosamente"    
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado
  }

  
  module.exports = {
    obtenerDatosinicioSesion,
    cerrarSesion,
    actualizarTokenUsuario,
    verificarUsuario,
    actualizarContrasena
  
  };
  