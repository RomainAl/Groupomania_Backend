const db = require("../models");
const Comment = db.comment;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new comment
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.subjectId) {
    res.status(400).send({
      message: 'Content "subjectId" can not be empty!'
    });
    return;
  }
  // Create a comment
  const comment = {
    text: req.body.text,
    author: req.body.author,
    subjectId: req.body.subjectId,
    userId: req.userId
  };

  // Save comment in the database
  Comment.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
};

// Retrieve all comments from the database.
exports.findAll = (req, res, next) => {
  Comment.findAll({ 
    where: {},
    order: [['id', 'DESC']],
    include: ["subject", "user"]  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comment."
      });
    });
};

// Find a single comment with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Comment.findByPk(id, { include: ["subject", "user"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    });
};

// Update a comment by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;
  Comment.findByPk(id, { include: ["user"] })
  .then(data => {

    User.findByPk(req.userId).then(user => {

      if ((user.role !== 'admin') && (data.userId !== req.userId)){

        res.status(403).send({
          message: "Require to be The user or administrator !"
        });
        return;

      } else {

        Comment.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Comment was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Comment with id=" + id
            });
          });

        }
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating comment."
      });
    });
};

// Delete a comment with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;
  Comment.findByPk(id, { include: ["user"] })
  .then(data => {
    User.findByPk(req.userId).then(user => {
      if ((user.role !== 'admin') && (data.userId !== req.userId)){
        res.status(403).send({
          message: "Require to be The user or administrator !"
        });
        return;
      } else {
        Comment.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Comment was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Comment with id=" + id
            });
          });
          }
        })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting comment."
        });
      });
};

// Delete all comments from the database.
exports.deleteAll = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role !== 'admin'){
      res.status(403).send({
        message: "Require to be administrator !"
      });
      return;
    } else {
      Comment.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Comment were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all comments."
          });
        });
      }
    })
};
