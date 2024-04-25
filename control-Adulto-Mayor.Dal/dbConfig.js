//-----ruta BD variable -----//
const path = require(`path`);
const envPath = path.resolve(__dirname, `../`, ".env").replace(/\\/g, `/`);
require(`dotenv`).config({ path: envPath });
const dataBasePath = process.env.DATABASE_URL;
//---------------------------//

// dbConfig.js
const pgp = require('pg-promise')();

console.log(envPath)
console.log(dataBasePath)

const db = pgp({
  connectionString: dataBasePath,
});

module.exports = db;