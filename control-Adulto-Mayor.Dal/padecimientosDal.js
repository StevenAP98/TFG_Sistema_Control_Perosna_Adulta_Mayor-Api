const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');


async function obtenerPadecimientosXIdResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var padecimientos = await db.query(`SELECT * FROM "Schema-datos"."Padecimientos" WHERE "idResidente" = '${idResidente}'`)
    resultado.ObjetoRespuesta =padecimientos;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerPadecimiento(idPadecimiento) {
  var resultado = new Respuesta ();

  try {   
    
    var padecimientos = await db.query(`SELECT * FROM "Schema-datos"."Padecimientos" WHERE "idPadecimiento" = '${idPadecimiento}'`)
    resultado.ObjetoRespuesta =padecimientos;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarPadecimiento(padecimientos) {
  var resultado = new Respuesta ();

  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."Padecimientos"(
      
      "nombrePadecimiento",
      "descripcion",
      "fechaPadecerlo",
      "idResidente",
      "criticidad"
      )
    VALUES (
      '${padecimientos.nombrePadecimiento}',
      '${padecimientos.descripcion}',
      '${padecimientos.fechaPadecerlo}',
      '${padecimientos.idResidente}',
      '${padecimientos.criticidad}');  
  `)
    
    resultado.HayError = false;
    resultado.Mensaje="Padecimiento agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarPadecimiento(padecimientos) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."Padecimientos"
    SET   
      "nombrePadecimiento"='${padecimientos.nombrePadecimiento}', 
      "descripcion"='${padecimientos.descripcion}', 
      "fechaPadecerlo"='${padecimientos.fechaPadecerlo}', 
      "criticidad"='${padecimientos.criticidad}'
      
    WHERE 
      "idPadecimiento"=${padecimientos.idPadecimiento};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Padecimiento actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarPadecimiento(idPadecimiento) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Padecimientos"
      WHERE "idPadecimiento"=${idPadecimiento};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Padecimiento eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerPadecimientosXIdResidente,
  obtenerPadecimiento,
  agregarPadecimiento,
  actualizarPadecimiento,
  eliminarPadecimiento
};

 