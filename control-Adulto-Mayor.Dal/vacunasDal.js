const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');


async function obtenerVacunasXIdResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var vacunas = await db.query(`
    SELECT 
      "idVacuna",
      "nombreVacuna",
      descripcion,
      TO_CHAR("fechaAplicacion", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fechaAplicacion",
      "idResidente"
    FROM 
      "Schema-datos"."Vacunas"
    WHERE 
      "idResidente" = '${idResidente}'`)
    resultado.ObjetoRespuesta =vacunas;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerVacuna(idVacuna) {
  var resultado = new Respuesta ();

  try {   
    
    var vacunas = await db.query(`
    SELECT 
      "idVacuna",
      "nombreVacuna",
      descripcion,
      TO_CHAR("fechaAplicacion", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fechaAplicacion",
      "idResidente"
    FROM 
      "Schema-datos"."Vacunas"
    WHERE
      "idVacuna" = '${idVacuna}'`)
    resultado.ObjetoRespuesta =vacunas;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarVacuna(vacunas) {
  var resultado = new Respuesta ();

  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."Vacunas"(
      
      "nombreVacuna",
       descripcion,
      "fechaAplicacion",
      "idResidente")
    VALUES (
      '${vacunas.nombreVacuna}',
      '${vacunas.descripcion}',
      '${vacunas.fechaAplicacion}',
      ${vacunas.idResidente});  
  `)
    
    resultado.HayError = false;
    resultado.Mensaje="Vacuna agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarVacuna(vacunas) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."Vacunas"
    SET   
      "nombreVacuna"='${vacunas.nombreVacuna}', 
      descripcion='${vacunas.descripcion}', 
      "fechaAplicacion"='${vacunas.fechaAplicacion}'
      
    WHERE 
      "idVacuna"=${vacunas.idVacuna};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Vacuna actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarVacuna(idVacuna) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Vacunas"
      WHERE "idVacuna"=${idVacuna};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Vacuna eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerVacunasXIdResidente,
  obtenerVacuna,
  agregarVacuna,
  actualizarVacuna,
  eliminarVacuna
};

 