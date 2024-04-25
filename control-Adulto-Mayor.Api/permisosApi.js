const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

// Habilita CORS para todas las rutas
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:4000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //credentials: true,
}));

const PermisosBL = require('../control-Adulto-Mayor.BL/permisosBL');

async function obtenerPermisosXIdUsuario(req, res) {
  const { idUsuario } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const permisos = await PermisosBL.obtenerPermisosXIdUsuario(idUsuario)
    res.json(permisos);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}


async function obtenerPermisosXIdRol(req, res) {
  const { idRol } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const permisos = await PermisosBL.obtenerPermisosXIdRol(idRol)
    res.json(permisos);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function insertarPermisos(req, res) {
  var permisos = req.body

  try {
    const response = await PermisosBL.insertarPermisos(permisos);
    res.json(response);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}


async function actualizarPermisos(req, res) {
  var permisos = req.body
  try {
    const usuario = await PermisosBL.actualizarPermisos(permisos);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarPermiso(req, res) {
  const { idPermiso } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await PermisosBL.eliminarPermiso(idPermiso);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function obtenerRoles(req, res) {
  const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const permisos = await PermisosBL.obtenerRoles();
    res.json(permisos);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function obtenerRol(req, res) {
  const { idUsuario } = req.params;
  return PermisosBL.obtenerRol(idUsuario)
   
}

async function insertarRoles(req, res) {
  var rol = req.body
  try {

    const permisos = await PermisosBL.insertarRoles(rol);
    res.json(permisos);

  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}


async function actualizarRol(req, res) {
  var rol = req.body
  try {

    const permisos = await PermisosBL.actualizarRol(rol);
    res.json(permisos);

  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function eliminarRol(req, res) {
  const { idRol } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await PermisosBL.eliminarRol(idRol);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function obtenerVentanas(req, res) {
  try {
    const response = await PermisosBL.obtenerVentanas()
    res.json(response);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  obtenerRoles,
  obtenerPermisosXIdUsuario,
  obtenerPermisosXIdRol,
  insertarPermisos,
  actualizarPermisos,
  eliminarPermiso,
  obtenerRol,
  insertarRoles,
  actualizarRol,
  eliminarRol,
  obtenerVentanas
  
};
  
 