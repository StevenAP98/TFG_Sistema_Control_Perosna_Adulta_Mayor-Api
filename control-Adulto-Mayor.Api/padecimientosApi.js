const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

const PadecimientoBL = require('../control-Adulto-Mayor.BL/padecimientosBL');

async function obtenerPadecimientosXIdResidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const usuario = await PadecimientoBL.obtenerPadecimientosXIdResidente(idResidente);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerPadecimiento(req, res) {
  const { idPadecimiento } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await PadecimientoBL.obtenerPadecimiento(idPadecimiento);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarPadecimiento(req, res) {
  try {   

    var usuario = req.body
    respuesta = await PadecimientoBL.agregarPadecimiento(usuario);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarPadecimiento(req, res) {

  try {

      var usuario = req.body
      respuesta = await PadecimientoBL.actualizarPadecimiento(usuario);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarPadecimiento(req, res) {
  const { idPadecimiento } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await PadecimientoBL.eliminarPadecimiento(idPadecimiento);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerPadecimientosXIdResidente,
  obtenerPadecimiento,
  agregarPadecimiento,
  actualizarPadecimiento,
  eliminarPadecimiento,
};
