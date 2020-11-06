const db = require('../client');

async function dropSchema() {
  await db.connect();

  await db.query('drop schema public cascade;');

  await db.query('create schema public;');

  await db.end();
}

dropSchema();
