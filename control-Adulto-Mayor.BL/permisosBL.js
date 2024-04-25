const PermisosDal = require('../control-Adulto-Mayor.Dal/permisosDal');

async function obtenerPermisosXIdUsuario(idUsuario) {
  return PermisosDal.obtenerPermisosXIdUsuario(idUsuario)
   
}

async function obtenerPermisosXIdRol(idRol) {
  
  var permisos=await PermisosDal.obtenerPermisos(idRol)

  if(permisos.ObjetoRespuesta.length>0)
  {
    return permisos;

  }else{
    var parametro ={id:idRol};
    var rol =await PermisosDal.obtenerRoles(parametro)

    permisos.ObjetoRespuesta=
    [
      {
        idrol:rol.ObjetoRespuesta[0].id,
        rol:rol.ObjetoRespuesta[0].nombre 
      }
    ] 
  }

  return permisos;
}

async function insertarPermisos(permisos) {
  return PermisosDal.insertarPermisos(permisos)
  
}

function actualizarPermisos(permisos) {
  return PermisosDal.actualizarPermisos(permisos);

}

function eliminarPermiso(idPermiso) {
  return PermisosDal.eliminarPermiso(idPermiso)
}

async function insertarRoles(rol) {
  return PermisosDal.insertarRoles(rol)
  
}
async function insertarRoles(rol) {
  return PermisosDal.insertarRoles(rol)
  
}
async function obtenerRoles() {
  var roles =await PermisosDal.obtenerRoles();
  var permisos = await PermisosDal.obtenerPermisos();

  var ventanas=``;

  for(var rol of roles.ObjetoRespuesta){
    ventanas=``;

    for(permiso of permisos.ObjetoRespuesta){
      
      if(rol.nombre==permiso.rol){
        ventanas+=ventanas==``?permiso.ventana:`, ${permiso.ventana}`

      }
    }
    rol.ventanas=ventanas;
    ventanas==``;
  }

  return roles
  
}

async function actualizarRol(rol) {
  return await PermisosDal.actualizarRol(rol);
}

async function eliminarRol(idRol) {
  return await PermisosDal.eliminarRol(idRol)
}

function obtenerVentanas(idRol) {
  return PermisosDal.obtenerVentanas(idRol)
}

module.exports = {
  obtenerPermisosXIdUsuario,
  obtenerPermisosXIdRol,
  insertarPermisos,
  actualizarPermisos,
  obtenerRoles,
  eliminarPermiso,
  insertarRoles,
  actualizarRol,
  eliminarRol,
  obtenerVentanas

  };
  
 