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

db.comment = require("./comment.js")(sequelize, Sequelize);
db.subject = require("./subject.js")(sequelize, Sequelize);

db.subject.hasMany(db.comment, { as: "comment" });
db.comment.belongsTo(db.subject, {
  foreignKey: "subjectId",
  as: "subject",
});

module.exports = db;
