//-------------------------
// Application générale
//-------------------------
const express = require('express');
const cors = require("cors");
const db = require("./models");

const commentRoutes = require('./routes/comment'); // charge les routes
const subjectRoutes = require('./routes/subject'); // charge les routes
const userRoutes = require('./routes/user'); // charge les routes
const path = require('path'); // permet de retrouver les paths des images (work in progress)

const app = express();

// Connexion/synchronisation à la base de donnée mySQL :
db.sequelize.sync();
// // drop the table if it already exists
//db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//});

var corsOptions = { origin: "http://localhost:8081" };
app.use(cors(corsOptions));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/comment', commentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;