const db = require("../models");
const Subject = db.subject;
const Comment = db.comment;
const Op = db.Sequelize.Op;

// Create and Save a new subject
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a subject
  const subject = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save subject in the database
  Subject.create(subject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the subject."
      });
    });

};

// Retrieve all subjects from the database.
exports.findAll = (req, res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Subject.findAll({ where: condition, include: ["comment"] })
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
exports.findOne = (req, res) => {

  const id = req.params.id;

  Subject.findByPk(id, { include: ["comment"] })
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
exports.update = (req, res) => {

  const id = req.params.id;

  Subject.update(req.body, {
    where: { id: id },
    include: ["comment"]
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

};

// Delete a subject with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

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

};

// Delete all subjects from the database.
exports.deleteAll = (req, res) => {

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

};

// find all published subject
exports.findAllPublished = (req, res) => {

  Subject.findAll({ where: { published: true } })
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
