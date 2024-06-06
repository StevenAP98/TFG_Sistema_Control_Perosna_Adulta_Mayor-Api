const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

const VacunaBL = require('../control-Adulto-Mayor.BL/vacunasBL');

async function obtenerVacunasXIdResidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const usuario = await VacunaBL.obtenerVacunasXIdResidente(idResidente);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerVacuna(req, res) {
  const { idVacuna } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await VacunaBL.obtenerVacuna(idVacuna);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarVacuna(req, res) {
  try {   

    var usuario = req.body
    respuesta = await VacunaBL.agregarVacuna(usuario);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarVacuna(req, res) {

  try {

      var usuario = req.body
      respuesta = await VacunaBL.actualizarVacuna(usuario);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarVacuna(req, res) {
  const { idVacuna } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await VacunaBL.eliminarVacuna(idVacuna);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerVacunasXIdResidente,
  obtenerVacuna,
  agregarVacuna,
  actualizarVacuna,
  eliminarVacuna,
};
