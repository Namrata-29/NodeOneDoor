//common sftp function
const env = process.env.NODE_ENV || 'development';
const config_data = require('../config/config.json')[env];

const od_sftp_host = config_data.od_sftp_host
const od_sftp_username = config_data.od_sftp_username
const privateKeyPath = config_data.privateKeyPath
const privateKeyFileName = config_data.privateKeyFileName
path = require('path')
node_ssh = require('node-ssh')
ssh = new node_ssh()

const sftpconn = {
   host: od_sftp_host,
   username: od_sftp_username,
   privateKey: require('fs').readFileSync(privateKeyPath + privateKeyFileName, 'utf8')
}


module.exports.sftpconn = ssh;
