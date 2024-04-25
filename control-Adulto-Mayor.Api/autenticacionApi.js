
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

const autenticacionBL = require('../control-Adulto-Mayor.BL/autenticacionBL');

async function iniciarSesion(req, res) {

    try {
      var datosAuthValidar = req.body

      respuesta = await autenticacionBL.iniciarSesion(datosAuthValidar);
  
      res.json(respuesta);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
async function cerrarSesion(req, res) {

    try {
      const { idUsuario } = req.params;
  
      respuesta = await autenticacionBL.cerrarSesion(idUsuario);
  
      res.json(respuesta);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function restablecerContrasenaTemporal(req, res) {
    try {
      var datosValidar = req.body
  
      respuesta = await autenticacionBL.restablecerContrasenaTemporal(datosValidar);
  
      res.json(respuesta);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function restablecerContrasena(req, res) {
    try {
      var datosValidar = req.body
  
      respuesta = await autenticacionBL.restablecerContrasena(datosValidar);
  
      res.json(respuesta);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async function verificarUsuario(req, res) {
    try {
      var datosAuthValidar = req.body
       //var paginaInicio = req.header('Referer');
  
      respuesta = await autenticacionBL.verificarUsuario(datosAuthValidar);
  
      res.json(respuesta);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = {
    iniciarSesion,
    verificarUsuario,
    cerrarSesion,
    restablecerContrasena,
    restablecerContrasenaTemporal
  };
  