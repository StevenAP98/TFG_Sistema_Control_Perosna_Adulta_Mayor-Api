const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');

async function obtenerFisioterapiaXIdRecidente(idRecidente) {
  var resultado = new Respuesta ();

  try {   
    
    var fisioterapia = await db.query(`
    SELECT 
      "idFisioterapia",
      TO_CHAR("fecha", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fecha",
      tratamiento,
      recomendaciones,
      "idFisioterapia",
      "diagnostico"
    FROM 
      "Schema-datos"."Fisioterapia"
    WHERE
      "idResidente" = '${idRecidente}'`)
    resultado.ObjetoRespuesta =fisioterapia;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerFisioterapia(idFisioterapia) {
  var resultado = new Respuesta ();

  try {   
    
    var fisioterapia = await db.query(`
    SELECT 
      "idFisioterapia",
      TO_CHAR("fecha", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fecha",
      "tratamiento",
      "recomendaciones",
      "idResidente",
      "diagnostico"
    FROM 
      "Schema-datos"."Fisioterapia"
    WHERE
      "idFisioterapia" = '${idFisioterapia}'`)
    resultado.ObjetoRespuesta =fisioterapia;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarFisioterapia(fisioterapia) {
  var resultado = new Respuesta ();

  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."Fisioterapia"(
      
      tratamiento,
      "fecha",
      "recomendaciones",
      "idResidente",
      "diagnostico")
    VALUES (
      '${fisioterapia.tratamiento}',
      '${fisioterapia.fecha}',
      '${fisioterapia.recomendaciones}',
      ${fisioterapia.idRecidente},
      '${fisioterapia.diagnostico}');  
  `)
    
    resultado.HayError = false;
    resultado.Mensaje="Fisioterapia agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarFisioterapia(fisioterapia) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."Fisioterapia"
    SET   
      tratamiento='${fisioterapia.tratamiento}', 
      "fecha"='${fisioterapia.fecha}',
      "recomendaciones"='${fisioterapia.recomendaciones}',
      "diagnostico"='${fisioterapia.diagnostico}'
      
    WHERE 
      "idFisioterapia"=${fisioterapia.idFisioterapia};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Fisioterapia actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarFisioterapia(idFisioterapia) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Fisioterapia"
      WHERE "idFisioterapia"=${idFisioterapia};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Fisioterapia eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerFisioterapiaXIdRecidente,
  obtenerFisioterapia,
  agregarFisioterapia,
  actualizarFisioterapia,
  eliminarFisioterapia,
};

 