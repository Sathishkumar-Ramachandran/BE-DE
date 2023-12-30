<<<<<<< HEAD
const { Pool } = require('pg');
const dotenv = require('dotenv');
=======
const moongoose= require('mongoose');
const env = require('dotenv');
>>>>>>> 19e950baa42b5eae7da53ef1cffec91ee422df13

dotenv.config();

<<<<<<< HEAD
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
=======
const DB = process.env.DB;
>>>>>>> 19e950baa42b5eae7da53ef1cffec91ee422df13

pool.on('error', (err) => {
  console.error('Database connection error:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  shutdown: () => pool.end(),
};
