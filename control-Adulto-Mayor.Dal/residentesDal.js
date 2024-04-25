const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');

async function obtenerResidentes() {
  var resultado = new Respuesta ();
  
  try {   
    var residente = await db.query('SELECT * FROM "Schema-datos"."Residentes"')
    resultado.ObjetoRespuesta = residente;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.MensajeError=error.message
  }
  return resultado

}
async function obtenerResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var residente = await db.query(`SELECT * FROM "Schema-datos"."Residentes" WHERE "idResidente" = '${idResidente}'`)
    resultado.ObjetoRespuesta =residente;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarResidente(residente) {
  var resultado = new Respuesta ();

  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."Residentes"(
      
       nombre,
       apellidos,
       "edad",
       "fechaNacimiento",
       "telefonoFamiliar",
       "nombreFamiliarCercano",
       "parentezcoFamiliar",
       "direccionFamiliar",
       "estadoCivil", 
       "fechaIngreso",
       genero,
       habitacion,
       "idEncargado")
    VALUES (
      '${residente.nombre}',
      '${residente.apellidos}',
      '${residente.edad}',
      '${residente.fechaNacimiento}',
      '${residente.telefonoFamiliar}',
      '${residente.nombreFamiliarCercano}',
      '${residente.parentezcoFamiliar}',
      '${residente.direccionFamiliar}',
      '${residente.estadoCivil}',
      '${residente.fechaIngreso}',
      '${residente.genero}',
      '${residente.habitacion}',
      '${residente.idEncargado}');  
  `)
    
    resultado.HayError = false;
    resultado.Mensaje="Residente agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarResidente(residente) {
  var resultado = new Respuesta ();

  console.log(`
  UPDATE "Schema-datos"."Residentes"
  SET   
    nombre='${residente.nombre}', 
    apellidos='${residente.apellidos}', 
    edad=${residente.edad},
    "fechaNacimiento"='${residente.fechaNacimiento}',
    "telefonoFamiliar"='${residente.telefonoFamiliar}',
    "nombreFamiliarCercano"='${residente.nombreFamiliarCercano}',
    "parentezcoFamiliar"='${residente.parentezcoFamiliar}',
    "direccionFamiliar"='${residente.direccionFamiliar}',
    "estadoCivil"='${residente.estadoCivil}',
    "parentezcoFamiliar"='${residente.parentezcoFamiliar}',
    "fechaIngreso"='${residente.fechaIngreso}',
    genero='${residente.genero}',
    habitacion='${residente.habitacion}',
    "idEncargado"=${residente.idEncargado}
    
  WHERE 
    "idResidente"=${residente.idResidente};
`)
  try {   

    db.query(`
    UPDATE "Schema-datos"."Residentes"
    SET   
      nombre='${residente.nombre}', 
      apellidos='${residente.apellidos}', 
      edad=${residente.edad},
      "fechaNacimiento"='${residente.fechaNacimiento}',
      "telefonoFamiliar"='${residente.telefonoFamiliar}',
      "nombreFamiliarCercano"='${residente.nombreFamiliarCercano}',
      "parentezcoFamiliar"='${residente.parentezcoFamiliar}',
      "direccionFamiliar"='${residente.direccionFamiliar}',
      "estadoCivil"='${residente.estadoCivil}',
      "fechaIngreso"='${residente.fechaIngreso}',
      genero='${residente.genero}',
      habitacion='${residente.habitacion}',
      "idEncargado"=${residente.idEncargado}
      
    WHERE 
      "idResidente"=${residente.idResidente};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Residente actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Residentes"
      WHERE "idResidente"=${idResidente};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Residente eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerResidentes,
  obtenerResidente,
  agregarResidente,
  actualizarResidente,
  eliminarResidente
};

 