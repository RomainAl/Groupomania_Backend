module.exports = app => {
  const comments = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // Create a new Comment
  router.post("/", comments.create);

  // Retrieve all Comment
  router.get("/", comments.findAll);

  // Retrieve a single Comment with id
  router.get("/:id", comments.findOne);

  // Update a Comment with id
  router.put("/:id", comments.update);

  // Delete a Comment with id
  router.delete("/:id", comments.delete);

  // Delete all Comment
  router.delete("/", comments.deleteAll);

  app.use('/api/comments', router);
};
