const path = require('path');
require('dotenv').config({ path: path.join(__dirname, `../../.env.server`) });
const { Pool } = require('pg');

// DB Connection Config
let DB_URL = process.env.DB_URL;
let DB_USER = process.env.DB_USER;
let DB_PASSWORD = process.env.DB_PASSWORD;
let DB_HOST = process.env.DB_HOST;
let DB_NAME = process.env.DB_NAME;
let DB_PORT = process.env.DB_PORT;
// Connection String Pattern
// schema://user:password@host:port/db_name
let dbString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
console.log(dbString)
// let dbString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:35000/${DB_NAME}`;
let pool = new Pool({ connectionString: dbString });

pool.connect()
  .then(()=>{
    console.log('db connected')
  })
  .catch((err) => {
    console.log('db not connected', err)
  })

module.exports = pool;

