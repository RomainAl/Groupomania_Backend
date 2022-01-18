//-----------------------------------
// Middlewares "Métiers" des subjects
//-----------------------------------
const db = require("../models"); // charge la data base (my SQL)
const Subject = db.subject;
const Comment = db.comment;
const User = db.user;
const Op = db.Sequelize.Op;
const fs = require('fs');

// Create and Save a new subject
exports.create = (req, res, next) => {

  if (req.file === undefined){
    subjectObject = { ...req.body};
  } else {
    subjectObject = {
      ...JSON.parse(req.body.subject),
      imageUrl: `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`
    };
  }

  // Create a subject
  const subject = {
    ...subjectObject,
    userId: req.userId
  };

  // Save subject in the database
  Subject.create(subject, next)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.errors[0].message || "Some error occurred while creating the subject."
      });
    });

};

// Retrieve all subjects from the database.
exports.findAll = (req, res, next) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Subject.findAll({ 
    where: condition, include: ["comment", "user"],
    order: [['id', 'DESC']],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subjects."
      });
    });

};

// Find a single subject with an id
exports.findOne = (req, res, next) => {

  const id = req.params.id;

  Subject.findByPk(id, { include: ["comment", "user"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find subject with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving subject with id=" + id
      });
    });

};

// Update a subject by the id in the request
exports.update = (req, res, next) => {

  const id = req.params.id;

  if (req.file === undefined){ 
    subjectObject = { ...req.body };
  } else {
    subjectObject = {
      ...JSON.parse(req.body.subject),
      imageUrl: `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`
    };
  }

  Subject.findByPk(id, { include: ["user"] })
    .then(data => {

      User.findByPk(req.userId).then(user => {

        if ((user.role !== 'admin') && (data.userId !== req.userId)){

          res.status(403).send({
            message: "Require to be The user or administrator !"
          });
          return;

        } else {

          Subject.update(req.body, {
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "subject was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update subject with id=${id}. Maybe subject was not found or req.body is empty!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating subject with id=" + id
              });
            });
        }
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating subject."
      });
    });

};

// Delete a subject with the specified id in the request
exports.delete = (req, res, next) => {

  const id = req.params.id;

  Subject.findByPk(id, { include: ["user"] })
    .then(data => {
      User.findByPk(req.userId).then(user => {
        if ((user.role !== 'admin') && (data.userId !== req.userId)){
          res.status(403).send({
            message: "Require to be The user or administrator !"
          });
          return;
        } else {
          // Suppression des commentaires liées au subject :
          Comment.destroy({
            where: {subjectId: id},
            truncate: false
          })
            .then(nums => {
              Subject.destroy({
                where: { id: id }
              })
                .then(num => {
                  if (num == 1) {
                    res.send({
                      message: "subject was deleted successfully!"
                    });
                  } else {
                    res.send({
                      message: `Cannot delete subject with id=${id}. Maybe subject was not found!`
                    });
                  }
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Could not delete subject with id=" + id
                  });
                });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while removing all subjects."
              });
            });
        }
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting subject."
      });
    });
};

// Delete all subjects from the database.
exports.deleteAll = (req, res, next) => {

  User.findByPk(req.userId).then(user => {
    if (user.role !== 'admin'){
      res.status(403).send({
        message: "Require to be administrator !"
      });
      return;
    } else {
      // Suppression du commentaire lié au subject :
      Comment.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          Subject.destroy({
            where: {},
            truncate: false
          })
            .then(nums => {
              res.send({ message: `${nums} subjects were deleted successfully!` });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while removing all subjects."
              });
            });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all subjects."
          });
        });
      }
  })

};

// find all published subject
exports.findAllPublished = (req, res, next) => {

  Subject.findAll({ 
    where: { published: true },
    order: [['id', 'DESC']],
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subjects."
      });
    });

};
