//-----------------------------------
// Middlewares "Métiers" des users
//-----------------------------------
const bcrypt = require('bcrypt'); // pour crypter les mots de passe
const jwt = require('jsonwebtoken'); // permet de créer un token lors de la connexion du user
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;


// Find a single subject with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;
  if (id != req.userId){

    res.status(403).send({
      message: "Require to be The user!"
    });
    return;

  } else {

    User.findByPk(id, { include: ["subject", "comment"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });

  }
}

// Delete a subject with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;

  User.findByPk(req.userId)
  .then(user => {
    if ((user.role != 'admin')&&(id != req.userId)){
      res.status(403).send({
        message: "Require to be administrator or The user!"
      });
      return;
    } else {

      User.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete user with id=${id}. Maybe subject was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete subject with id=" + id
          });
        });

    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting user."
    });
  });

}

// Update a subject by the id in the request
exports.update = (req, res, next) => {

  const id = req.params.id;

  if (id != req.userId){

    res.status(403).send({
      message: "Require to be The user!" + id
    });
    return;

  } else {



    userObject = { ...req.body };
    if (req.body.password !== undefined){
      userObject.password = bcrypt.hashSync(req.body.password, 10);
    }


    User.update(userObject, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });

        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe subject was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating subject with id=" + id
        });
      });
  }

}


// Retrieve all users from the database.
exports.findAll = (req, res, next) => {

  User.findByPk(req.userId)
  .then(user => {
    if (user.role !== 'admin'){
      res.status(403).send({
        message: "Require to be administrator !"
      });
      return;
    } else {

      const username = req.query.username;
      var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

      User.findAll({ where: condition, include: ["subject", "comment"] })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving subjects."
          });
        });

    }
  })
  .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the user!"
      });
    });
};


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
      res.send({ data: data , message: "User registered successfully !" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.errors[0].message || "Some error occurred while creating the user."
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
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                accessToken: token
            });

        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};