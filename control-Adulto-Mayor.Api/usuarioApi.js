const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

const UsuarioBL = require('../control-Adulto-Mayor.BL/usuarioBL');

async function obtenerUsuarios(req, res) {
  try {
    const usuario = await UsuarioBL.obtenerUsuarios();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerUsuario(req, res) {
  const { idUsuario } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await UsuarioBL.obtenerUsuario(idUsuario);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarUsuario(req, res) {
  try {   

    var usuario = req.body
    respuesta = await UsuarioBL.agregarUsuario(usuario);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarUsuario(req, res) {

  try {

      var usuario = req.body
      respuesta = await UsuarioBL.actualizarUsuario(usuario);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarUsuario(req, res) {
  const { idUsuario } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await UsuarioBL.eliminarUsuario(idUsuario);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
