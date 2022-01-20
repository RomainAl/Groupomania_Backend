

module.exports = {
  HOST: "localhost",
  USER: process.env.DB_user, // à remplir
  PASSWORD: process.env.DB_password, // à remplir
  DB: process.env.DB_name, // à remplir
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
