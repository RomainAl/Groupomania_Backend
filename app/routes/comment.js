const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

// Create a new Comment
router.post("/", commentCtrl.create);

// Retrieve all Comment
router.get("/", commentCtrl.findAll);

// Retrieve a single Comment with id
router.get("/:id", commentCtrl.findOne);

// Update a Comment with id
router.put("/:id", commentCtrl.update);

// Delete a Comment with id
router.delete("/:id", commentCtrl.delete);

// Delete all Comment
router.delete("/", commentCtrl.deleteAll);

module.exports = router;