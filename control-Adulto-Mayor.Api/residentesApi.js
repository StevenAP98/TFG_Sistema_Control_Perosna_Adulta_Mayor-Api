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
const ResidenteBL = require('../control-Adulto-Mayor.BL/residentesBL');

async function obtenerResidentes(req, res) {
  try {
    const usuario = await ResidenteBL.obtenerResidentes();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerResidente(req, res) {
  const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await ResidenteBL.obtenerResidente(idResidente);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarResidente(req, res) {
  try {   

    var usuario = req.body
    respuesta = await ResidenteBL.agregarResidente(usuario);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarResidente(req, res) {

  try {

      var usuario = req.body
      respuesta = await ResidenteBL.actualizarResidente(usuario);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarResidente(req, res) {
  const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await ResidenteBL.eliminarResidente(idResidente);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  obtenerResidentes,
  obtenerResidente,
  agregarResidente,
  actualizarResidente,
  eliminarResidente,
};
