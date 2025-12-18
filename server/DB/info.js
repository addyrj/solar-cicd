module.exports = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3306,
  USER: process.env.USER || "root",
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE_NAME: process.env.DB,
  DIALECT: process.env.DIALECT || "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};