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
  obtenerMedicamentos
};
