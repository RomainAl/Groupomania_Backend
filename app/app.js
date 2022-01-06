//-------------------------
// Application générale
//-------------------------
const express = require('express');
const cors = require("cors");
const db = require("./models");

const commentRoutes = require('./routes/comment');
const subjectRoutes = require('./routes/subject');

const app = express();

//db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});

var corsOptions = { origin: "http://localhost:8081" };
app.use(cors(corsOptions));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/comment', commentRoutes);
app.use('/api/subject', subjectRoutes);

module.exports = app;