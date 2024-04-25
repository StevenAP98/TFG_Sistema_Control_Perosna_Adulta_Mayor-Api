const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');

async function obtenerUsuarios() {
  var resultado = new Respuesta ();
  
  try {   
    var usuario = await db.query(`
    SELECT U.*, R.nombre AS Rol FROM "Schema-datos"."Usuarios" U
    INNER JOIN "Schema-datos"."Roles" R ON R.id= U."idRol"
    `
    )
    resultado.ObjetoRespuesta = usuario;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.MensajeError=error.message
  }
  return resultado

}
async function obtenerUsuario(idUsuario) {
  var resultado = new Respuesta ();

  try {   
    
    var usuario = await db.query(`SELECT * FROM "Schema-datos"."Usuarios" WHERE "idUsuario" = '${idUsuario}'`)
    resultado.ObjetoRespuesta =usuario;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerUsuarioXNombreUsuario(nombreUsuario) {
  var resultado = new Respuesta ();

  try {   
    
    var usuario = await db.query(`SELECT * FROM "Schema-datos"."Usuarios" WHERE "nombreUsuario" = '${nombreUsuario}'`)
    resultado.ObjetoRespuesta =usuario;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarUsuario(usuario) {
  var resultado = new Respuesta ();

  try {

    db.query(`
      INSERT INTO "Schema-datos"."Usuarios"(
      nombre, apellidos, edad, "nombreUsuario", contrasena, telefono, "idRol")
      VALUES ('${usuario.nombre}', '${usuario.apellidos}', ${usuario.edad}, '${usuario.nombreUsuario}', '${usuario.contrasena}', '${usuario.telefono}', ${usuario.rol});  
    `)
    
    resultado.HayError = false;
    resultado.Mensaje="Usuario agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarUsuario(usuario) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."Usuarios"
    SET   
      nombre='${usuario.nombre}', 
      apellidos='${usuario.apellidos}', 
      edad=${usuario.edad},
      "nombreUsuario"='${usuario.nombreUsuario}',
      contrasena='${usuario.contrasena}',
      telefono='${usuario.telefono}',
      "idRol"=${usuario.rol}
    WHERE 
      "idUsuario"=${usuario.idUsuario};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Usuario actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarUsuario(idUsuario) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Usuarios"
      WHERE "idUsuario"=${idUsuario};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Usuario eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioXNombreUsuario
};

 