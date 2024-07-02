require(`dotenv`);
const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.MIDDLEWARE_CRYPT;
// Función de encriptación
function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
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
      req.body = decrypt(req.body.value);
    }
    return req;
}

module.exports ={
    encrypt,
    decrypt,
    decryptReq
}