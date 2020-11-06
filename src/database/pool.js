require('dotenv/config');

const pg = require('pg');

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  define: {
    underscored: true,
    underscoredAll: true,
  },
});

module.exports = pool;
