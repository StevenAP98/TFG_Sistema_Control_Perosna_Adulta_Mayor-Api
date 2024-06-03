// // Importar la función desde el archivo1.jscirugia
const CirugiaDal = require('../control-Adulto-Mayor.Dal/cirugiasDal');
const  hat = require('hat');
const claveEncriptacion = 'TuClaveSecreta';
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const cron = require('node-cron');
const credentials = require('../credentialsGmail.json')
const nombresMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

//cron.schedule('*/5 * * * * *', recordatorioCita, { // ejecuta cada 30 segundos
//ejecuta cada dia a las 9 de la mañana
 cron.schedule('0 9 * * *', recordatorioCita, {
  scheduled: true,
  timezone: "America/Costa_Rica" // Puedes cambiar esto a tu zona horaria
});


// Manten el proceso en ejecución
process.stdin.resume();
async function recordatorioCita() {
  var datosEnviar = await CirugiaDal.obtenerDatosRecordatorio()
  for(var dato of datosEnviar){
    var fechaVencimiento = new Date(dato.fechaCirugia);
    var fechaActual = new Date();
    
    var diferenciaDias = Math.ceil((fechaVencimiento - fechaActual) / (1000 * 60 * 60 * 24));
    if (diferenciaDias <=7 && dato.estado=="En espera") {
      await enviarCorreoRecordatorio(dato)

    }
  }
}

async function enviarCorreoRecordatorio(datoEnviar){

// Configurar el transporter de nodemailer con OAuth 2.0
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'sistemahogarancianosesparza@gmail.com',
        clientId: credentials.client_id,
        clientSecret: credentials.client_secret,
        refreshToken: credentials.refresh_token,
        accessToken: credentials.refresh_token,
    }
});

const hora = new Date(datoEnviar.fechaCirugia).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
const dia = new Date(datoEnviar.fechaCirugia).getDate();
const mes = nombresMeses[new Date(datoEnviar.fechaCirugia).getMonth()]; 
const anno = new Date(datoEnviar.fechaCirugia).getFullYear();

const subject = 'Recordatorio Cirugía';
const text = `
<html>
  <head>
      <title>Recordatorio Cirugía</title>
  </head>
  <body style="font-family: Arial, sans-serif; font-size: 14px;">
      <h5>Hola ${datoEnviar.nombreencargado}</h5>
      <p>
        Le recordamos que el residente ${datoEnviar.nombreresidente}, tiene la siguiente cirugía "${datoEnviar.nombreCirugia}" el día ${dia} del mes de ${mes} del año ${anno} a las ${hora}, favor estar pendiente de la fecha
      </p>
      <p>Gracias,</p>
      <img src="cid:logo" alt="Logo">
  </body>
 </html>
`;

// Detalles del correo electrónico
const mailOptions = {
    from: 'sistemahogarancianosesparza@gmail.com',
    to: datoEnviar.correoElectronico,
    subject: subject,
    html: text, // Utiliza el HTML en lugar del texto plano
    attachments: [{
        filename: 'logo-hogar-footer.png',
        path: '../control-Adulto-Mayor.BL/img/logo-hogar-footer.png',
        cid: 'logo'
    }]
};

// Enviar correo electrónico
await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.error('Error al enviar el correo electrónico:', error);
    } else {
        console.log('Correo electrónico enviado:', info.response);
    }
});

}


// Llamar a la función
function obtenerCirugiasXIdResidente(idResidente){
    return CirugiaDal.obtenerCirugiasXIdResidente(idResidente)
}

function obtenerCirugia(idCirugia){
  return CirugiaDal.obtenerCirugia(idCirugia)
}


async function agregarCirugia(usuario){

  return CirugiaDal.agregarCirugia(usuario)
}


async function actualizarCirugia(usuario){
  return CirugiaDal.actualizarCirugia(usuario)
}

function eliminarCirugia(idCirugia){
  return CirugiaDal.eliminarCirugia(idCirugia)
}


  // Exportar las funciones como un objeto
module.exports = {
    obtenerCirugia,
    obtenerCirugiasXIdResidente,
    agregarCirugia,
    actualizarCirugia,
    eliminarCirugia,
};

  