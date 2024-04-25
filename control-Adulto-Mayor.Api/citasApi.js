const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
const path = require('path');
const fs = require('fs');

// Habilita CORS para todas las rutas
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:4000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //credentials: true,
}));
const CitaBL = require('../control-Adulto-Mayor.BL/citasBL');

async function obtenerCitasXIdResidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const cita = await CitaBL.obtenerCitasXIdResidente(idResidente);
    res.json(cita);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerCita(req, res) {
  const { idCita } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const cita = await CitaBL.obtenerCita(idCita);

    // rutaAdjunto=cita.ObjetoRespuesta[0].rutaAdjunto.replace(/^[^-]*-/, ''); // elimina el id del inicio
    // cita.ObjetoRespuesta[0].rutaAdjunto=rutaAdjunto

    res.json(cita);

    
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarCita(req, res) {

  try {
    //Guarda en base de datos
    const cita = JSON.parse(req.body.jsonData);
    respuesta = await CitaBL.agregarCita(cita);

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error al agregar cita y guardar el archivo');
  }
}

async function actualizarCita(req, res) {
  try {
    const cita = JSON.parse(req.body.jsonData);
    const respuesta = await CitaBL.actualizarCita(cita);

    res.json(respuesta);
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
}

async function eliminarCita(req, res) {
  const { idCita } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const cita = await CitaBL.eliminarCita(idCita);
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerCitasXIdResidente,
  obtenerCita,
  agregarCita,
  actualizarCita,
  eliminarCita,
};
