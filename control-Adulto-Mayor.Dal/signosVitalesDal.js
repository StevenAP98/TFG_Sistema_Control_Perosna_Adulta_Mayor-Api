const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');


async function obtenerSignosVitalesXIdResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var signosVitales = await db.query(`
    SELECT 
      "idSignosVitales",
      "presionArterial",
      "frecuenciaCardiaca",
      temperatura,
      "saturacionOxigeno",
      "idResidente",
      TO_CHAR("fecha", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fecha"
    FROM 
      "Schema-datos"."SignosVitales"
    WHERE 
      "idResidente" = '${idResidente}'`)
    resultado.ObjetoRespuesta =signosVitales;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerSignosVitales(idSignosVitales) {
  var resultado = new Respuesta ();

  try {   
    
    var signosVitales = await db.query(`
    SELECT 
      "idSignosVitales",
      "presionArterial",
      "frecuenciaCardiaca",
      temperatura,
      "saturacionOxigeno",
      "idResidente",
      TO_CHAR("fecha", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fecha"
    FROM 
      "Schema-datos"."SignosVitales"
    WHERE 
      "idSignosVitales" = '${idSignosVitales}'`)
    resultado.ObjetoRespuesta =signosVitales;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarSignosVitales(signosVitales) {
  var resultado = new Respuesta ();

  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."SignosVitales"(
      
      "fecha",
      "presionArterial",
      "frecuenciaCardiaca",
      "temperatura",
      "saturacionOxigeno",
      "idResidente"
      )
    VALUES (
      '${signosVitales.fecha}',
      '${signosVitales.presionArterial}',
      '${signosVitales.frecuenciaCardiaca}',
      '${signosVitales.temperatura}',
      '${signosVitales.saturacionOxigeno}',
      '${signosVitales.idResidente}');  
  `)
    
    resultado.HayError = false;
    resultado.Mensaje="SignosVitales agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarSignosVitales(signosVitales) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."SignosVitales"
    SET   
      "fecha"='${signosVitales.fecha}', 
      "presionArterial"='${signosVitales.presionArterial}', 
      "frecuenciaCardiaca"='${signosVitales.frecuenciaCardiaca}', 
      "temperatura"='${signosVitales.temperatura}', 
      "saturacionOxigeno"='${signosVitales.saturacionOxigeno}'
      
    WHERE 
      "idSignosVitales"=${signosVitales.idSignosVitales};
  `)

    resultado.HayError = false;
    resultado.Mensaje="SignosVitales actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarSignosVitales(idSignosVitales) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."SignosVitales"
      WHERE "idSignosVitales"=${idSignosVitales};

  `)
    resultado.HayError = false;
    resultado.Mensaje="SignosVitales eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerSignosVitalesXIdResidente,
  obtenerSignosVitales,
  agregarSignosVitales,
  actualizarSignosVitales,
  eliminarSignosVitales
};

 