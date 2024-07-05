require(`dotenv`);
const crypto = require('crypto');

const ENCRYPTION_KEY = Buffer.from(process.env.MIDDLEWARE_CRYPT, 'hex'); // Convertir la clave desde hexadecimal a Buffer

function encrypt(text) {
    const iv = Buffer.from('3ca3566ed7ef0f74e0619d0ade0e7d40', 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return  encrypted;
}

function decrypt(encryptedData, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from('3ca3566ed7ef0f74e0619d0ade0e7d40', 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function decryptReq(req){
     // Desencriptar parámetros de la URL
     if (req.params) {
        for (const param in req.params) {
            req.params[param] = decrypt(req.params[param]);
        }
    }

    // Desencriptar parámetros de la consulta
    if (req.query) {
        for (const key in req.query) {
            req.query[key] = decrypt(req.query[key]);
        }
    }
    // Desencriptar parámetros de la consulta
    if (req.body?.value) {
      req.body = JSON.parse(decrypt(req.body.value));
    }
    return req;
}

module.exports ={
    encrypt,
    decrypt,
    decryptReq
}