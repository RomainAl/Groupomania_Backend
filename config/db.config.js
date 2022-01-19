

module.exports = {
  HOST: "localhost",
  USER: "", // Remplir
  PASSWORD: "", // Remplir
  DB: "groupomania_socialnetwork", // Créer la database mySQL en amont
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
