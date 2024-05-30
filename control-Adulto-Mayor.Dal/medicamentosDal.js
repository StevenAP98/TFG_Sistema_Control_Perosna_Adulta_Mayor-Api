const Respuesta = require('../control-Adulto-Mayor.Entities/respuesta')
const db = require('./dbConfig');


async function obtenerMedicamentos() {
  var resultado = new Respuesta ();

  try {   
    
    var medicamentosXResdiente = await obtenerMedicamentosXResidente();
    var medicamentos=[];

    for (var medicamento of medicamentosXResdiente.ObjetoRespuesta){

      if(medicamentos.filter(x=>x.idMedicamento==medicamento.idMedicamento).length==0){
        medicamentos.push({
          idMedicamento:medicamento.idMedicamento,
          stockDisponible:medicamento.stockDisponible,
          nombre:medicamento.nombreMedicamento,
          descripcion:medicamento.descripcion,
          residente:medicamento.residente

        })
      }else{
        medicamentos.filter(x=>x.idMedicamento==medicamento.idMedicamento)[0].residente+=`, ${medicamento.residente}`
      }
    }

    resultado.ObjetoRespuesta =medicamentos;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}


async function obtenerMedicamentosXResidente(idMedicamento) {
  var resultado = new Respuesta ();

  try {   
    filtrar = idMedicamento!=undefined?  `WHERE M."idMedicamento"= '${idMedicamento}'`:``

    var medicamentosXResidente = await db.query(
    `
    SELECT M.*, R.nombre || ' ' || R.apellidos AS Residente, X."stokOcupado", X."idMedicamentoXResidente", M."stockDisponible", R."idResidente", X.tipo FROM  "Schema-datos"."Medicamentos" M
    INNER JOIN "Schema-datos"."MedicamentosXResidente" X
    ON X."idMedicamento" = M."idMedicamento"
    INNER JOIN "Schema-datos"."Residentes" R
    ON R."idResidente"= X."idResidente" 
    ${filtrar}
    `)
      var medicamentos = await db.query(`SELECT M.* FROM "Schema-datos"."Medicamentos" M ${filtrar};`)
      
      if(medicamentosXResidente.length==0){
        medicamentosXResidente=medicamentos;

      }else{
        for(medicamento of medicamentos){

          if(medicamentosXResidente.filter(x=>x.idMedicamento==medicamento.idMedicamento).length==0)
          {
            medicamentosXResidente.push(
              {
                idMedicamento:medicamento.idMedicamento,
                descripcion:medicamento.descripcion,
                nombreMedicamento:medicamento.nombreMedicamento,
                stockDisponible:medicamento.stockDisponible,
                residente:"",
                stokOcupado:"",
                idMedicamentoXResidente:"",
                stockDisponible:"",
                idResidente:"",
                tipo:""
              }
            )
          }
        }
      }


    resultado.ObjetoRespuesta =medicamentosXResidente;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function agregarMedicamentosXResidente(medicamentoXResidente) {
  var resultado = new Respuesta ();

  try {   
    var InsertMedicamentoXResidente=
    `
      INSERT INTO "Schema-datos"."MedicamentosXResidente"(
        "idResidente",
        "idMedicamento",
        "stokOcupado",
        "tipo"
        )
      VALUES (
        '${medicamentoXResidente.idResidente}',
        '${medicamentoXResidente.idMedicamento}',
        '${medicamentoXResidente.stokOcupado}',
        '${medicamentoXResidente.tipo}');  
    `
  await db.query(InsertMedicamentoXResidente);

  var idMedicamento=await db.query(`SELECT MAX(M."idMedicamentoXResidente") AS "idMedicamentoXResidente" FROM "Schema-datos"."MedicamentosXResidente" M`);
  resultado.ObjetoRespuesta=idMedicamento;
  resultado.mensaje ="El medicamentoXResidente a sido agregado correctamente";
  resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

function actualizarMedicamentosXResidente(medicamentoXResidente) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."MedicamentosXResidente"
    SET   
      "idResidente"='${medicamentoXResidente.idResidente}', 
      "idMedicamento"='${medicamentoXResidente.idMedicamento}', 
      "stokOcupado"='${medicamentoXResidente.stokOcupado}', 
      "tipo"='${medicamentoXResidente.tipo}'
      
    WHERE 
      "idMedicamentoXResidente"=${medicamentoXResidente.idMedicamentoXResidente};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Medicamento actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}
function eliminarMedicamentosXResidente(idMedicamentoXResidente) {
  var resultado = new Respuesta ();

  try {   
    db.query(`
      DELETE FROM "Schema-datos"."MedicamentosXResidente"
      WHERE "idMedicamentoXResidente"=${idMedicamentoXResidente};

  `)
    resultado.HayError = false;
    resultado.Mensaje="Medicamento eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}




async function obtenerMedicamentosXIdResidente(idResidente) {
  var resultado = new Respuesta ();

  try {   
    
    var Medicamentos = await db.query(
      `
      SELECT M.*, R.nombre || ' ' || R.apellidos AS Residente, X."stokOcupado", X."idMedicamentoXResidente", X."stokOcupado", R."idResidente", X.tipo FROM  "Schema-datos"."Medicamentos" M
      INNER JOIN "Schema-datos"."MedicamentosXResidente" X
      ON X."idMedicamento" = M."idMedicamento"
      INNER JOIN "Schema-datos"."Residentes" R
      ON R."idResidente"= X."idResidente" 
      WHERE R."idResidente" = '${idResidente}'`)
    resultado.ObjetoRespuesta =Medicamentos;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function obtenerMedicamento(idMedicamento) {
  var resultado = new Respuesta ();

  try {   
    
    var Medicamentos = await db.query(`SELECT * FROM "Schema-datos"."Medicamentos" WHERE "idMedicamento" = '${idMedicamento}'`)
    resultado.ObjetoRespuesta =Medicamentos;
    resultado.HayError = false;

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }
  return resultado
  
}

async function agregarMedicamento(Medicamentos) {
  var resultado = new Respuesta ();
  

  try {
    var InsertMedicamento=
    `
      INSERT INTO "Schema-datos"."Medicamentos"(
        
        "nombreMedicamento",
        "descripcion",
        "stockDisponible",
        miligramos,
        "fechaVencimiento"
        
        )
      VALUES (
        '${Medicamentos.nombreMedicamento}',
        '${Medicamentos.descripcion}',
        ${Medicamentos.stockDisponible},
        '${Medicamentos.miligramos}',
        '${Medicamentos.fechaVencimiento}');  
    `
    await db.query(InsertMedicamento);
    
    var idMedicamento= await db.query(`SELECT MAX(M."idMedicamento") AS "idMedicamento" FROM "Schema-datos"."Medicamentos" M`);
    resultado.ObjetoRespuesta=idMedicamento;

    resultado.HayError = false;
    resultado.Mensaje="Medicamento agregado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  
  return resultado
}

function actualizarMedicamento(Medicamentos) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
    UPDATE "Schema-datos"."Medicamentos"
    SET   
      "nombreMedicamento"='${Medicamentos.nombreMedicamento}', 
      "descripcion"='${Medicamentos.descripcion}', 
      "stockDisponible"='${Medicamentos.stockDisponible}',
      "miligramos"='${Medicamentos.miligramos}',
      "fechaVencimiento"='${Medicamentos.fechaVencimiento}'
      
    WHERE 
      "idMedicamento"=${Medicamentos.idMedicamento};
  `)

    resultado.HayError = false;
    resultado.Mensaje="Medicamento actualizado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}


function eliminarMedicamento(idMedicamento) {
  var resultado = new Respuesta ();

  try {   

    db.query(`
      DELETE FROM "Schema-datos"."MedicamentosXResidente"
      WHERE "idMedicamento"=${idMedicamento};
    `)

    db.query(`
      DELETE FROM "Schema-datos"."Medicamentos"
      WHERE "idMedicamento"=${idMedicamento};

    `)


    resultado.HayError = false;
    resultado.Mensaje="Medicamento eliminado exitosamente"    

  } catch (error) {
    resultado.HayError=true
    resultado.mensaje=error.message
  }

  return resultado
}

module.exports = {
  obtenerMedicamentosXResidente,
  obtenerMedicamentosXIdResidente,
  agregarMedicamentosXResidente,
  actualizarMedicamentosXResidente,
  agregarMedicamentosXResidente,
  eliminarMedicamentosXResidente,
  obtenerMedicamento,
  agregarMedicamento,
  actualizarMedicamento,
  eliminarMedicamento,
  obtenerMedicamentos
};

 