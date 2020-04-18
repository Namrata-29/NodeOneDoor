//common function

const { Pool, Client } = require('pg');
const configData = require('../config/config.json') [process.env.env];

console.debug('Config data : ' , configData);

const env = process.env.NODE_ENV || 'development';
const username = configData.username ;
const password = configData.password;
const hostname = configData.hostname;
const port = configData.port;
const database = configData.database;
const schema = configData.schema;
console.debug('username -' + username);

const client = new Pool({
  user: username,
  host: hostname,
  database: database,
  password: password,
  port: port,
});

console.debug('PostgresSql Client :' , client);
module.exports.client = client;
