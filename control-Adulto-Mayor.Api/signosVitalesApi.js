const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

const SignosVitalesBL = require('../control-Adulto-Mayor.BL/signosVitalesBL');

async function obtenerSignosVitalesXIdResidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const usuario = await SignosVitalesBL.obtenerSignosVitalesXIdResidente(idResidente);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerSignosVitales(req, res) {
  const { idSignosVitales } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await SignosVitalesBL.obtenerSignosVitales(idSignosVitales);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarSignosVitales(req, res) {
  try {   

    var usuario = req.body
    respuesta = await SignosVitalesBL.agregarSignosVitales(usuario);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarSignosVitales(req, res) {

  try {

      var usuario = req.body
      respuesta = await SignosVitalesBL.actualizarSignosVitales(usuario);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarSignosVitales(req, res) {
  const { idSignosVitales } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await SignosVitalesBL.eliminarSignosVitales(idSignosVitales);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerSignosVitalesXIdResidente,
  obtenerSignosVitales,
  agregarSignosVitales,
  actualizarSignosVitales,
  eliminarSignosVitales,
};
