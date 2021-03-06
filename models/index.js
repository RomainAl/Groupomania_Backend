//-----------------------------------
// Permets de configurer et créer la 
// database et ses tables, et de les 
// lier en eux ("hasmany")
//-----------------------------------
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.comment = require("./comment.js")(sequelize, Sequelize);
db.subject = require("./subject.js")(sequelize, Sequelize);

db.subject.hasMany(db.comment, { as: "comment" });
db.comment.belongsTo(db.subject, {
  foreignKey: "subjectId",
  as: "subject",
});

db.user.hasMany(db.subject, { as: "subject" });
db.subject.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.user.hasMany(db.comment, { as: "comment" });
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
