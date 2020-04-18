const { Pool } = require('pg');
const pool = require('../common/dbconn.js').client;
module.exports = {
  query: (text, params) => pool.query(text, params),
} ;