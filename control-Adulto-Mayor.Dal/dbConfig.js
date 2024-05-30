//-----ruta BD variable -----//
const path = require(`path`);
const envPath = path.resolve(__dirname, `../`, ".env").replace(/\\/g, `/`);
require(`dotenv`).config({ path: envPath });
const dataBasePath = process.env.DATABASE_URL;
//---------------------------//

// dbConfig.js
const pgp = require('pg-promise')();

const db = pgp({
  connectionString: dataBasePath,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;