const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');

async function obtenerPermisos(idRol) {
  var resultado = new Respuesta ();

  try {   
    var where = idRol!=undefined?`WHERE R."id"=${idRol};`:``

    var permisos = await db.query(`
    SELECT P.id idPermiso, R.id idRol, V.id idVentana, R.nombre Rol, V.nombre Ventana, P.permiso_escritura, P.permiso_lectura, P.permiso_eliminar
    FROM "Schema-datos"."Permiso" P
    INNER JOIN "Schema-datos"."Roles" R on R.id=P.id_rol
    INNER JOIN "Schema-datos"."Ventanas" V on V.id=P.id_ventana
    ${where}
    `)
    
    resultado.ObjetoRespuesta =permisos;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}


async function obtenerPermisosXIdUsuario(idUsuario) {
    var resultado = new Respuesta ();
  
    try {   
      
      var permisos = await db.query(`
      SELECT R.nombre AS Rol, V.nombre AS Ventana, V.ruta, P.permiso_escritura, P.permiso_lectura, P.permiso_eliminar
      FROM "Schema-datos"."Permiso" P
      INNER JOIN "Schema-datos"."Roles" R ON R.id = P.id_rol
      INNER JOIN "Schema-datos"."Ventanas" V ON V.id = P.id_ventana
      INNER JOIN "Schema-datos"."Usuarios" U ON U."idRol" = R.id
      WHERE U."idUsuario"=${idUsuario}
    `)

      
      resultado.ObjetoRespuesta =permisos;
      resultado.HayError = false;
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
    return resultado
    
  }

  async function insertarPermisos(permisos) {
    var resultado = new Respuesta ();
  
    try {   
      
      var permisos = await db.query(`
      INSERT INTO "Schema-datos"."Permiso"
       (id_rol,
        id_ventana,
        permiso_lectura, 
        permiso_escritura, 
        permiso_eliminar
        ) 
        VALUES 
        (${permisos.idRol},
         ${permisos.idVentana}, 
         ${permisos.permisoLectura}, 
         ${permisos.permisoEscritura}, 
         ${permisos.permisoEliminar});

      `)
      
      var idPermiso=await db.query(`SELECT MAX(P."id") AS "idPermiso" FROM "Schema-datos"."Permiso" P`);
      resultado.ObjetoRespuesta=idPermiso;
      resultado.mensaje ="El permiso a sido agregado correctamente";
      resultado.HayError = false;
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
    return resultado
    
  }
  function actualizarPermisos(permisos) {
    var resultado = new Respuesta ();
  
    try {   
  
      db.query(`
      UPDATE "Schema-datos"."Permiso"
      SET   
        "id_rol"='${permisos.idRol}', 
        "id_ventana"='${permisos.idVentana}', 
        "permiso_lectura"='${permisos.permisoLectura}', 
        "permiso_escritura"='${permisos.permisoEscritura}', 
        "permiso_eliminar"='${permisos.permisoEliminar}'
        
      WHERE 
        "id"=${permisos.idPermiso};
    `)
  
      resultado.HayError = false;
      resultado.Mensaje="Permiso actualizado exitosamente"    
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado
  }

  function eliminarPermiso(idPermiso) {
    var resultado = new Respuesta ();

    try {   
      db.query(`
        DELETE FROM "Schema-datos"."Permiso"
        WHERE "id"=${idPermiso};
  
    `)
      resultado.HayError = false;
      resultado.Mensaje="Permiso eliminado exitosamente"    
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado
  }

  async function obtenerRoles(rol) {    
    var resultado = new Respuesta ();
    
    try {   

      if(rol!=undefined)
        var where = rol.id!=undefined?`WHERE "id"=${rol.id};`:``


      var roles = await db.query(`
      SELECT * FROM  "Schema-datos"."Roles"
      ${where};  
      `)
      resultado.ObjetoRespuesta =roles;
      resultado.HayError = false;

    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }

    return resultado
  }
  
  async function obtenerVentanas(rol) {    
    var resultado = new Respuesta ();
    
    try {   
      var ventanas = await db.query(`
      SELECT * FROM  "Schema-datos"."Ventanas"`)
      resultado.ObjetoRespuesta =ventanas;
      resultado.HayError = false;

    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }

    return resultado
  }


  async function insertarRoles(rol) {
    var resultado = new Respuesta ();
  
    try {   

      var roles = await db.query(`
      INSERT INTO "Schema-datos"."Roles"
       (nombre
        ) 
        VALUES 
        ('${rol.nombre}');
      `)

      var roles= await db.query(`SELECT MAX(R."id") AS "idRol" FROM "Schema-datos"."Roles" R`);
      resultado.ObjetoRespuesta=roles;
      resultado.HayError = false;
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
    return resultado
    
  }
  async function actualizarRol(rol) {
    var resultado = new Respuesta ();
  
    try {   
  
      await db.query(`
      UPDATE "Schema-datos"."Roles"
      SET   
        "nombre"='${rol.nombre}'
      WHERE 
        "id"=${rol.id};
    `)
  
      resultado.HayError = false;
      resultado.Mensaje="Rol actualizado exitosamente"    
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado
  }

  async function eliminarRol(idRol) {
    var resultado = new Respuesta ();

    try {   
      await db.query(`
      DELETE FROM "Schema-datos"."Roles"
      WHERE "id"=${idRol};
    `)

    await db.query(`
      DELETE FROM "Schema-datos"."Permiso"
      WHERE "id_rol"=${idRol};

    `)
      resultado.HayError = false;
      resultado.Mensaje="Rol eliminado exitosamente"    
  
    } catch (error) {
      resultado.HayError=true
      resultado.mensaje=error.message
    }
  
    return resultado
  }




module.exports = {
obtenerPermisosXIdUsuario,
obtenerPermisos,
insertarPermisos,
actualizarPermisos,
eliminarPermiso,
obtenerRoles,
insertarRoles,
actualizarRol,
eliminarRol,
obtenerVentanas

};

 