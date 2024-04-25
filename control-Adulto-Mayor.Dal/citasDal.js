const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');
const moment = require('moment-timezone');

async function obtenerCitasXIdResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var citas = await db.query(`    
    SELECT
      "idCita",
      titulo,
      especialidad,
      descripcion,
      "idResidente",
      estado,
      "rutaAdjunto",
      "doctorAsignado",
      "centroMedico",
      "notasConsultaMedica",
      TO_CHAR("fechaCita", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS fechaCita
    FROM
      "Schema-datos"."Citas"  
    WHERE 
      "idResidente" = '${idResidente}'
    `)
    resultado.ObjetoRespuesta =citas;
    resultado.HayError = false;
    // idResidente
  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerCita(idCita) {
  var resultado = new Respuesta ();

  try {   
    
    var citas = await db.query(`
    SELECT
      "idCita",
      titulo,
      especialidad,
      descripcion,
      "idResidente",
      estado,
      "rutaAdjunto",
      "doctorAsignado",
      "centroMedico",
      "notasConsultaMedica",
      TO_CHAR("fechaCita", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS fechaCita
    FROM
      "Schema-datos"."Citas"  
    WHERE 
      "idCita" = '${idCita}'
    `)

    resultado.ObjetoRespuesta =citas;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function agregarCita(citas) {
  var resultado = new Respuesta ();

  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."Citas"(
      "titulo",
      "especialidad",
      "fechaCita",
      "descripcion",
      "idResidente",
      "estado",
      "rutaAdjunto",
      "doctorAsignado",
      "centroMedico",
      "notasConsultaMedica"
      )
    VALUES (
      '${citas.titulo}',
      '${citas.especialidad}',
      '${citas.fechaCita}',
      '${citas.descripcion}',
      '${citas.idResidente}',
      '${citas.estado}',
      '${citas.rutaAdjunto}',
      '${citas.doctorAsignado}',
      '${citas.centroMedico}',
      '${citas.notasConsultaMedica}');  
  `)
    
  var idCita=await db.query(`SELECT MAX(C."idCita") AS "idCita"  FROM "Schema-datos"."Citas" C`);
  resultado.ObjetoRespuesta=idCita;

    resultado.HayError = false;
    resultado.Mensaje="Cita agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarCita(citas) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."Citas"
    SET   
      "titulo"='${citas.titulo}',
      "especialidad"='${citas.especialidad}', 
      "fechaCita"='${citas.fechaCita}', 
      "descripcion"='${citas.descripcion}', 
      "estado"='${citas.estado}', 
      "rutaAdjunto"='${citas.rutaAdjunto}', 
      "doctorAsignado"='${citas.doctorAsignado}', 
      "centroMedico"='${citas.centroMedico}', 
      "notasConsultaMedica"='${citas.notasConsultaMedica}'
      
    WHERE 
      "idCita"=${citas.idCita};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Cita actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarCita(idCita) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Citas"
      WHERE "idCita"=${idCita};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Cita eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerCitasXIdResidente,
  obtenerCita,
  agregarCita,
  actualizarCita,
  eliminarCita
};

 