const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');

const MedicamentoBL = require('../control-Adulto-Mayor.BL/medicamentosBL');

async function obtenerMedicamentosXIdResidente(req, res) {
  try {
    const { idResidente } = req.params; // Obtén el parámetro 'id' de la URL
    
    const usuario = await MedicamentoBL.obtenerMedicamentosXIdResidente(idResidente);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerMedicamentosXResidente(req, res) {
  try {    
    const { idMedicamento } = req.params; // Obtén el parámetro 'id' de la URL

    const medicamentoXResidente = await MedicamentoBL.obtenerMedicamentosXResidente(idMedicamento);
    res.json(medicamentoXResidente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function agregarMedicamentosXResidente(req, res) {
  try {    
    var data = req.body

    const medicamentoXResidente = await MedicamentoBL.agregarMedicamentosXResidente(data);
    res.json(medicamentoXResidente);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarMedicamentosXResidente(req, res) {
  try {    
    var data = req.body

    const medicamentoXResidente = await MedicamentoBL.actualizarMedicamentosXResidente(data);
    res.json(medicamentoXResidente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarMedicamentosXResidente(req, res) {
  try {    
    const { idMedicamentoXResidente } = req.params; // Obtén el parámetro 'id' de la URL

    const medicamentoXResidente = await MedicamentoBL.eliminarMedicamentosXResidente(idMedicamentoXResidente);
    res.json(medicamentoXResidente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function obtenerMedicamentos(req, res) {

  try {
    const usuario = await MedicamentoBL.obtenerMedicamentos();
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}
async function obtenerMedicamento(req, res) {
  const { idMedicamento } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await MedicamentoBL.obtenerMedicamento(idMedicamento);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}

async function agregarMedicamento(req, res) {
  try {   

    var usuario = req.body
    respuesta = await MedicamentoBL.agregarMedicamento(usuario);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarMedicamento(req, res) {

  try {

      var usuario = req.body
      respuesta = await MedicamentoBL.actualizarMedicamento(usuario);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarMedicamento(req, res) {
  const { idMedicamento } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await MedicamentoBL.eliminarMedicamento(idMedicamento);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerDosisDiaria(req, res) {
  var dosisDiaria = req.body

  try {
    const usuario = await MedicamentoBL.obtenerDosisDiaria(dosisDiaria);
    res.json(usuario);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}


async function agregarDosisDiaria(req, res) {
  try {   

    var dosisDiaria = req.body
    respuesta = await MedicamentoBL.agregarDosisDiaria(dosisDiaria);

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarDosisDiaria(req, res) {

  try {

      var dosisDiaria = req.body
      respuesta = await MedicamentoBL.actualizarDosisDiaria(dosisDiaria);

      res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarDosisDiaria(req, res) {
  const { idDosisDiaria } = req.params; // Obtén el parámetro 'id' de la URL

  try {
    const usuario = await MedicamentoBL.eliminarDosisDiaria(idDosisDiaria);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  obtenerMedicamentosXIdResidente,
  obtenerMedicamentosXResidente,
  agregarMedicamentosXResidente,
  actualizarMedicamentosXResidente,
  eliminarMedicamentosXResidente,
  obtenerMedicamento,
  agregarMedicamento,
  actualizarMedicamento,
  eliminarMedicamento,
  obtenerMedicamentos,
  obtenerDosisDiaria,
  agregarDosisDiaria,
  actualizarDosisDiaria,
  eliminarDosisDiaria
};
