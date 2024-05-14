const autenticacionDal = require('../control-Adulto-Mayor.Dal/autenticacionDal');
const usuarioDal = require('../control-Adulto-Mayor.Dal/usuarioDal');
const usuarioBL = require('../control-Adulto-Mayor.BL/usuarioBL');

const  hat = require('hat');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


async function iniciarSesion(datosAuthValidar){
    var resultado=await autenticacionDal.obtenerDatosinicioSesion(datosAuthValidar);
    if(resultado.ObjetoRespuesta[0]!=undefined){
        
        if(await compararContrasena(datosAuthValidar.contrasena, resultado.ObjetoRespuesta[0].contrasena, resultado.ObjetoRespuesta[0].contrasenaTemporal)){

            var token = hat();
            await autenticacionDal.actualizarTokenUsuario(resultado.ObjetoRespuesta[0].idUsuario,token);
          
            resultado.ObjetoRespuesta = {
              token:token,
              idUsuario:resultado.ObjetoRespuesta[0].idUsuario,
              autenticado:true,
              contrasenaTemporal:resultado.ObjetoRespuesta[0].contrasenaTemporal
            }
      
        }else{
          resultado.ObjetoRespuesta={
            autenticado:false
          }
        }
    }else{
        resultado.ObjetoRespuesta={
            autenticado:false
        }

    }

    return resultado
}


async function cerrarSesion(idUsuario){

    var resultado=await autenticacionDal.cerrarSesion(idUsuario);
    return resultado

}

async function verificarUsuario(datosAuthValidar){
    var resultado=await autenticacionDal.verificarUsuario(datosAuthValidar);

    if(resultado.ObjetoRespuesta.length > 0){

        resultado.ObjetoRespuesta = {
        verificado:true
    }

    }else{
        resultado.ObjetoRespuesta={
        verificado:false
    }
    }

    return resultado
}
//Función para verificar y restablecer a una contraseña temporal
async function restablecerContrasenaTemporal(datosValidar){
    var usuario = await usuarioDal.obtenerUsuarioXNombreUsuario(datosValidar.nombreUsuario)
    var resultado={};

    if(usuario.ObjetoRespuesta[0] != undefined && usuario.ObjetoRespuesta[0] != null){

        var contrasenaTemporal =generarContrasennaTemporal();

        enviarCorreoContrasena(usuario.ObjetoRespuesta[0].correoElectronico, contrasenaTemporal);

        autenticacionDal.actualizarContrasena(usuario.ObjetoRespuesta[0].idUsuario, contrasenaTemporal, true)

        resultado.ObjetoRespuesta=[{
            hayError:false,
            existeUsuario:true,
            correoElectronico:usuario.ObjetoRespuesta[0].correoElectronico
        }]

    }else{
        resultado.ObjetoRespuesta=[{
            hayError:false,
            existeUsuario:false
        }]

    }

    return resultado;
}
//Funcion para cambiar contraseña una vez ya hecho eel preoceso de contraseña temporal
async function restablecerContrasena(datosValidar){

    var usuario = await usuarioDal.obtenerUsuarioXNombreUsuario(datosValidar.nombreUsuario)
    var resultado={};


    if(await compararContrasena(datosValidar.contrasenaTemporal, usuario.ObjetoRespuesta[0].contrasena, true)){      
        var contrasenaEncriptada= await usuarioBL.encriptarContrasena(datosValidar.contrasena)
        autenticacionDal.actualizarContrasena(usuario.ObjetoRespuesta[0].idUsuario, contrasenaEncriptada, false)
        
        resultado.ObjetoRespuesta=[{
            hayError:false,
            existeUsuario:true

        }]

    }else{
        resultado.ObjetoRespuesta=[{
            hayError:false,
            existeUsuario:false
        }]
    }

    return resultado

}


async function compararContrasena(contrasenaUsuario, contrasenaAlmacenada, esContrasenaTemporal){
    try {
    if(!esContrasenaTemporal){
        const resultado = await bcrypt.compare(contrasenaUsuario, contrasenaAlmacenada);
        return resultado;

    }else{
        return contrasenaUsuario == contrasenaAlmacenada?true:false;

    }

    } catch (error) {
        throw error;

    }
}

function generarContrasennaTemporal() {
    let contrasenna = '';
    logintudContraenna=10;

    while (contrasenna.length < logintudContraenna) {
      const bytes = crypto.randomBytes(logintudContraenna);
      contrasenna = bytes.toString('base64').substr(0, logintudContraenna);
    }
    return contrasenna;
  }

function enviarCorreoContrasena(correoDestinatario, contrasenaTemporal){
    const nodemailer = require("nodemailer");
    
    const credentials = {
        client_id: '430146061674-h8tp4cep11cdvbqu30clrmggu5c4o1ho.apps.googleusercontent.com',
        client_secret: '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',
        refresh_token: '1//04RGDiyOrdGzLCgYIARAAGAQSNwF-L9IrSfTNSZGpayGsVGqz2PBPiAQmB23BcsfyFSXc_dxHKAFhFHF27y95B0ADordGD-6FJik'
    };
    
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

        const subject = 'Restablecimiento de contraseña';
        const text = `
        <html>
        <head>
            <title>Restablecimiento de contraseña</title>
        </head>
        <body style="font-family: Arial, sans-serif; font-size: 14px;">
            <h5>Hola</h5>
            <p>
                Hemos recibido una solicitud para restablecer tu contraseña. Si no has solicitado este cambio, puedes ignorar este correo electrónico.
            </p>
            <p>
                Esta será tu nueva contraseña temporal: 
                <span style="font-weight: bold;">${contrasenaTemporal}</span>
            </p>
            <p>Gracias,</p>
            <img src="cid:logo" alt="Logo">
        </body>
        </html>
    `;
    
    // Detalles del correo electrónico
    const mailOptions = {
        from: 'sistemahogarancianosesparza@gmail.com',
        to: correoDestinatario,
        subject: subject,
        html: text, // Utiliza el HTML en lugar del texto plano
        attachments: [{
            filename: 'logo-hogar-footer.png',
            path: '../control-Adulto-Mayor.BL/img/logo-hogar-footer.png',
            cid: 'logo'
        }]
    };
    
    // Enviar correo electrónico
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    });

}

async function renovarToken(refreshToken) {
    try {
      const tokenRespuesta = await client.refreshToken(refreshToken);
      const accessToken = tokenRespuesta.credentials.access_token;
      // Aquí puedes usar el nuevo token de acceso para realizar operaciones, como enviar correos electrónicos
      console.log('Token de acceso renovado:', accessToken);
    } catch (error) {
      console.error('Error al renovar el token de acceso:', error.message);
    }
  }
module.exports = {    
iniciarSesion,
cerrarSesion,
verificarUsuario,
restablecerContrasenaTemporal,
restablecerContrasena
};

