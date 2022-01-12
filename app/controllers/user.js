//-----------------------------------
// Middlewares "Métiers" des users
//-----------------------------------
const bcrypt = require('bcrypt'); // pour crypter les mots de passe
const jwt = require('jsonwebtoken'); // permet de créer un token lors de la connexion du user
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;

// Middleware qui crée un user :
exports.signup = (req, res, next) => {

  // Create a user
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  // Save comment in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Middleware qui login un user :
exports.signin = (req, res, next) => {
    User.findOne({
        where: {
          username: req.body.username
        }
     })
        .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: jwt.sign(
                        { userId: user._id },
                        config.secret,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};