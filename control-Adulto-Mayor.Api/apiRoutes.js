
const express = require('express');
const router = express.Router();

const usuarioControllers = require('./usuarioApi.js');
const residenteControllers = require('./residentesApi.js');
const vacunaControllers = require('./vacunasApi.js');
const cirugiaControllers= require('./cirugiasApi.js');
const citasControllers= require('./citasApi.js');
const padecimientosControllers= require('./padecimientosApi.js');
const signosVitalesControllers= require('./signosVitalesApi.js');
const autenticacionControllers = require('./autenticacionApi.js');
const medicamentoControllers= require('./medicamentosApi.js');
const permisosController= require('./permisosApi.js');
const fisioterapiaController= require('./fisioterapiaApi.js');
const multer = require('multer');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const cors = require('cors');
const { autenticacion } = require('../control-Adulto-Mayor.Dal/usuarioDal.js');


const upload = multer({
  storage: multer.memoryStorage(), // Almacenamiento en memoria
  limits: {
    fieldSize: 25 * 1024 * 1024
  }
});

// // Habilita CORS para todas las rutas
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

//Usuarios
router.get('/usuarios/obtenerUsuarios', usuarioControllers.obtenerUsuarios);
router.get('/usuarios/obtenerUsuario/:idUsuario', usuarioControllers.obtenerUsuario);
router.post('/usuarios/agregarUsuario', jsonParser, usuarioControllers.agregarUsuario);
router.put('/usuarios/actualizarUsuario', jsonParser, usuarioControllers.actualizarUsuario);
router.delete('/usuarios/eliminarUsuario/:idUsuario', usuarioControllers.eliminarUsuario);

//Autenticación
router.post('/autenticacion/iniciarSesion', jsonParser, autenticacionControllers.iniciarSesion);
router.post('/autenticacion/cerrarSesion/:idUsuario', jsonParser, autenticacionControllers.cerrarSesion);
router.post('/autenticacion/verificarUsuario', jsonParser, autenticacionControllers.verificarUsuario);
router.post('/autenticacion/restablecerContrasenaTemporal', jsonParser, autenticacionControllers.restablecerContrasenaTemporal);
router.post('/autenticacion/restablecerContrasena', jsonParser, autenticacionControllers.restablecerContrasena);


//Residentes
router.get('/residentes/obtenerResidentes', residenteControllers.obtenerResidentes);
router.get('/residentes/obtenerResidente/:idResidente', residenteControllers.obtenerResidente);
router.post('/residentes/agregarResidente', jsonParser, residenteControllers.agregarResidente);
router.put('/residentes/actualizarResidente', jsonParser, residenteControllers.actualizarResidente);
router.delete('/residentes/eliminarResidente/:idResidente', residenteControllers.eliminarResidente);

//Vacunas
router.get('/vacunas/obtenerVacunasXIdResidente/:idResidente', vacunaControllers.obtenerVacunasXIdResidente);
router.get('/vacunas/obtenerVacuna/:idVacuna', vacunaControllers.obtenerVacuna);
router.post('/vacunas/agregarVacuna', jsonParser, vacunaControllers.agregarVacuna);
router.put('/vacunas/actualizarVacuna', jsonParser, vacunaControllers.actualizarVacuna);
router.delete('/vacunas/eliminarVacuna/:idVacuna', vacunaControllers.eliminarVacuna);

//Cirugía
router.get('/cirugias/obtenerCirugiasXIdResidente/:idResidente', cirugiaControllers.obtenerCirugiasXIdResidente);
router.get('/cirugias/obtenerCirugia/:idCirugia', cirugiaControllers.obtenerCirugia);
router.post('/cirugias/agregarCirugia', upload.single('file'), jsonParser, cirugiaControllers.agregarCirugia);
router.put('/cirugias/actualizarCirugia', upload.single('file'), cirugiaControllers.actualizarCirugia);
router.delete('/cirugias/eliminarCirugia/:idCirugia', cirugiaControllers.eliminarCirugia);

//citas
router.get('/citas/obtenerCitasXIdResidente/:idResidente', citasControllers.obtenerCitasXIdResidente);
router.get('/citas/obtenerCita/:idCita', citasControllers.obtenerCita);
router.post('/citas/agregarCita', jsonParser, upload.single('file'),citasControllers.agregarCita);
router.put('/citas/actualizarCita', jsonParser, upload.single('file'), citasControllers.actualizarCita);
router.delete('/citas/eliminarCita/:idCita', citasControllers.eliminarCita);

//Padecimientos
router.get('/padecimientos/obtenerPadecimientosXIdResidente/:idResidente', padecimientosControllers.obtenerPadecimientosXIdResidente);
router.get('/padecimientos/obtenerPadecimiento/:idPadecimiento', padecimientosControllers.obtenerPadecimiento);
router.post('/padecimientos/agregarPadecimiento', jsonParser, padecimientosControllers.agregarPadecimiento);
router.put('/padecimientos/actualizarPadecimiento', jsonParser, padecimientosControllers.actualizarPadecimiento);
router.delete('/padecimientos/eliminarPadecimiento/:idPadecimiento', padecimientosControllers.eliminarPadecimiento);

//Signos Vitales
router.get('/signosVitales/obtenerSignosVitalesXIdResidente/:idResidente', signosVitalesControllers.obtenerSignosVitalesXIdResidente);
router.get('/signosVitales/obtenerSignosVitales/:idSignosVitales', signosVitalesControllers.obtenerSignosVitales);
router.post('/signosVitales/agregarSignosVitales', jsonParser, signosVitalesControllers.agregarSignosVitales);
router.put('/signosVitales/actualizarSignosVitales', jsonParser, signosVitalesControllers.actualizarSignosVitales);
router.delete('/signosVitales/eliminarSignosVitales/:idSignosVitales', signosVitalesControllers.eliminarSignosVitales);

//Medicamento
router.get('/medicamentos/obtenerMedicamentosXIdResidente/:idResidente', medicamentoControllers.obtenerMedicamentosXIdResidente);
router.get('/medicamentos/obtenerMedicamentosXResidente/:idMedicamento', medicamentoControllers.obtenerMedicamentosXResidente);
router.get('/medicamentos/obtenerMedicamento/:idMedicamento', medicamentoControllers.obtenerMedicamento);
router.get('/medicamentos/obtenerMedicamentos', medicamentoControllers.obtenerMedicamentos);
router.post('/medicamentos/obtenerDosisDiaria',jsonParser, medicamentoControllers.obtenerDosisDiaria);
router.post('/medicamentos/agregarMedicamento', jsonParser, medicamentoControllers.agregarMedicamento);
router.post('/medicamentos/agregarMedicamentosXResidente', jsonParser, medicamentoControllers.agregarMedicamentosXResidente);
router.post('/medicamentos/agregarDosisDiaria', jsonParser, medicamentoControllers.agregarDosisDiaria);
router.put('/medicamentos/actualizarMedicamentosXResidente', jsonParser, medicamentoControllers.actualizarMedicamentosXResidente);
router.put('/medicamentos/actualizarMedicamento', jsonParser, medicamentoControllers.actualizarMedicamento);
router.put('/medicamentos/actualizarDosisDiaria', jsonParser, medicamentoControllers.actualizarDosisDiaria);
router.delete('/medicamentos/eliminarMedicamentosXResidente/:idMedicamentoXResidente', medicamentoControllers.eliminarMedicamentosXResidente);
router.delete('/medicamentos/eliminarMedicamento/:idMedicamento', medicamentoControllers.eliminarMedicamento);
router.delete('/medicamentos/eliminarDosisDiaria/:idDosisDiaria', medicamentoControllers.eliminarDosisDiaria);

//Fisioterapia
router.get('/fisioterapia/obtenerFisioterapiaXIdRecidente/:idResidente', fisioterapiaController.obtenerFisioterapiaXIdRecidente);
router.get('/fisioterapia/obtenerFisioterapia/:idFisioterapia', fisioterapiaController.obtenerFisioterapia);
router.post('/fisioterapia/agregarFisioterapia', jsonParser, fisioterapiaController.agregarFisioterapia);
router.put('/fisioterapia/actualizarFisioterapia', jsonParser, fisioterapiaController.actualizarFisioterapia);
router.delete('/fisioterapia/eliminarFisioterapia/:idFisioterapia', fisioterapiaController.eliminarFisioterapia);

//Permisos
router.get('/permisos/obtenerPermisosXIdUsuario/:idUsuario', permisosController.obtenerPermisosXIdUsuario);
router.get('/permisos/obtenerPermisosXIdRol/:idRol', permisosController.obtenerPermisosXIdRol);
router.post('/permisos/insertarPermisos', jsonParser, permisosController.insertarPermisos);
router.put('/permisos/actualizarPermisos', jsonParser, permisosController.actualizarPermisos);
router.delete('/permisos/eliminarPermiso/:idPermiso', permisosController.eliminarPermiso);

router.get('/roles/obtenerRoles', permisosController.obtenerRoles);
router.get('/roles/obtenerRol/:idRol', permisosController.obtenerRol);
router.post('/roles/insertarRoles',jsonParser, permisosController.insertarRoles);
router.put('/roles/actualizarRol', jsonParser, permisosController.actualizarRol);
router.delete('/roles/eliminarRol/:idRol', permisosController.eliminarRol);
router.get('/ventanas/obtenerVentanas', permisosController.obtenerVentanas);


router.post('/prueba', jsonParser, function(req, res){
    console.log("Body: ", req.body);
 }) 

module.exports = router;
