// console.log(process.env.TEST)

module.exports = {

  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  SSL_CA: process.env.SSL_CA,
  SSL_KEY: process.env.SSL_KEY,
  SSL_CERT: process.env.SSL_CERT,
  SECRET: process.env.SECRET,
  JWT_SECRET: process.env.JWT_SECRET,

};
