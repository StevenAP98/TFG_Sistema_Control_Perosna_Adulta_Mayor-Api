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
const fisioterapiaBL = require('../control-Adulto-Mayor.BL/fisioterapiaBL');

async function obtenerFisioterapiaXIdRecidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const data = await fisioterapiaBL.obtenerFisioterapiaXIdRecidente(idResidente);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerFisioterapia(req, res) {
  const { idFisioterapia } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const data = await fisioterapiaBL.obtenerFisioterapia(idFisioterapia);
    res.json(data);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarFisioterapia(req, res) {
  try {   

    var data = req.body
    respuesta = await fisioterapiaBL.agregarFisioterapia(data);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarFisioterapia(req, res) {

  try {

      var data = req.body
      respuesta = await fisioterapiaBL.actualizarFisioterapia(data);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarFisioterapia(req, res) {
  const { idFisioterapia } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const data = await fisioterapiaBL.eliminarFisioterapia(idFisioterapia);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerFisioterapiaXIdRecidente,
  obtenerFisioterapia,
  agregarFisioterapia,
  actualizarFisioterapia,
  eliminarFisioterapia,
};
