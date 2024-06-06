const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

const CirugiaBL = require('../control-Adulto-Mayor.BL/cirugiasBL');

async function obtenerCirugiasXIdResidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const usuario = await CirugiaBL.obtenerCirugiasXIdResidente(idResidente);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerCirugia(req, res) {
  const { idCirugia } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await CirugiaBL.obtenerCirugia(idCirugia);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarCirugia(req, res) {
  try {   
    const cirugia = JSON.parse(req.body.jsonData);
    respuesta = await CirugiaBL.agregarCirugia(cirugia);
    
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarCirugia(req, res) {

  try {
    const cirugia = JSON.parse(req.body.jsonData);
    respuesta = await CirugiaBL.actualizarCirugia(cirugia);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarCirugia(req, res) {
  const { idCirugia } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await CirugiaBL.eliminarCirugia(idCirugia);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerCirugiasXIdResidente,
  obtenerCirugia,
  agregarCirugia,
  actualizarCirugia,
  eliminarCirugia,
};
