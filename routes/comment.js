//-------------------------
// Routers pour les comments
//-------------------------
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Create a new Comment
router.post("/", auth, commentCtrl.create);

// Retrieve all Comment
router.get("/", auth, commentCtrl.findAll);

// Retrieve a single Comment with id
router.get("/:id", auth, commentCtrl.findOne);

// Update a Comment with id
router.put("/:id", auth, commentCtrl.update);

// Delete a Comment with id
router.delete("/:id", auth, commentCtrl.delete);

// Delete all Comments
router.delete("/", auth, commentCtrl.deleteAll);

module.exports = router;