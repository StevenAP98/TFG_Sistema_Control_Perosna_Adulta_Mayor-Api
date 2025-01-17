const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');


async function obtenerCirugiasXIdResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var cirugias = await db.query(`
    SELECT
      "idCirugia",
      "nombreCirugia",
      descripcion,
      "nombreCirujano",
      "tipoCirugia",
      "idResidente",
      TO_CHAR("fechaCirugia", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fechaCirugia",
      estado,
      "rutaAdjuntos"
    FROM 
      "Schema-datos"."Cirugias"
     WHERE 
      "idResidente" = '${idResidente}'`)
    resultado.ObjetoRespuesta =cirugias;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}
async function obtenerDatosRecordatorio() {
  var resultado = new Respuesta ();

  try {   
    
    var cirugia = await db.query(`
      select CI."fechaCirugia", CI."nombreCirugia", (R.nombre || ' ' || R.apellidos) as nombreResidente, (U.nombre || ' ' || U.apellidos) AS nombreEncargado, U."correoElectronico", CI.estado
      from "Schema-datos"."Cirugias" CI
      inner join "Schema-datos"."Residentes" R
      on R."idResidente" = CI."idResidente" 
      inner join "Schema-datos"."Usuarios" U
      on U."idUsuario"= R."idEncargado"
      
    `)

  } catch (error) {
    console.log(error)

  }
  return cirugia
  
}


async function obtenerCirugia(idCirugia) {
  var resultado = new Respuesta ();

  try {   
    
    var cirugias = await db.query(`
    SELECT
      "idCirugia",
      "nombreCirugia",
      descripcion,
      "nombreCirujano",
      "tipoCirugia",
      "idResidente",
      TO_CHAR("fechaCirugia", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "fechaCirugia",
      estado,
      "rutaAdjuntos",
      "nombreAdjuntos"
    FROM 
      "Schema-datos"."Cirugias"
    WHERE 
      "idCirugia" = '${idCirugia}'`)
    resultado.ObjetoRespuesta =cirugias;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function agregarCirugia(cirugias) { 
  var resultado = new Respuesta ();
  try {
    db.query(`
    
    INSERT INTO "Schema-datos"."Cirugias"(
      
      "nombreCirugia",
      "descripcion",
      "nombreCirujano",
      "tipoCirugia",
      "idResidente",
      "fechaCirugia",
      "estado",
      "rutaAdjuntos",
      "nombreAdjuntos"

      )
    VALUES (
      '${cirugias.nombreCirugia}',
      '${cirugias.descripcion}',
      '${cirugias.nombreCirujano}',
      '${cirugias.tipoCirugia}',
      '${cirugias.idResidente}',
      '${cirugias.fechaCirugia}',
      '${cirugias.estado}',
      '${cirugias.rutaAdjuntos}',
      '${cirugias.nombreAdjuntos}');  
  `)
    
    resultado.HayError = false;
    resultado.Mensaje="Cirugia agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarCirugia(cirugias) {
  var resultado = new Respuesta ();
  var queryNombreAdjuntos=``;

  if(cirugias.nombreAdjuntos!=undefined){
    queryNombreAdjuntos=`"nombreAdjuntos"='${cirugias.nombreAdjuntos}',`
  }

  try {   

    db.query(`
    UPDATE "Schema-datos"."Cirugias"
    SET   
      "nombreCirugia"='${cirugias.nombreCirugia}', 
      "descripcion"='${cirugias.descripcion}', 
      "nombreCirujano"='${cirugias.nombreCirujano}', 
      "tipoCirugia"='${cirugias.tipoCirugia}', 
      "fechaCirugia"='${cirugias.fechaCirugia}', 
      "estado"='${cirugias.estado}', 
      ${queryNombreAdjuntos}
      "rutaAdjuntos"='${cirugias.rutaAdjuntos}'
      
    WHERE 
      "idCirugia"=${cirugias.idCirugia};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Cirugia actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarCirugia(idCirugia) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."Cirugias"
      WHERE "idCirugia"=${idCirugia};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Cirugia eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerCirugiasXIdResidente,
  obtenerCirugia,
  agregarCirugia,
  actualizarCirugia,
  eliminarCirugia,
  obtenerDatosRecordatorio
};

 