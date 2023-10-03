
const {Pool}=require('pg');
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, SSL_CA, SSL_KEY, SSL_CERT } = require('../config');
const options=require('../server')

const fs=require('fs');

//cockroachDB 
// const connectionString=process.env.DATABASE_URL;

// const pool = new Pool({
//         connectionString,
//         application_name:"collaborative_code_editor",
//         ssl: {
//             rejectUnauthorized: false
//         }
//       });

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl:{ // certificate authentication for user "zuru problem"
        rejectUnauthorized:false,
        // ca: options.ca,
        // key: options.key,
        // cert: options.cert,
    }
  });


module.exports=pool;

















// const client = new Client({
//     host: 'my.database-server.com',
//     port: 5334,
//     database: 'database-name',
//     user: 'database-user',
//     password: 'secretpassword!!',
//   })