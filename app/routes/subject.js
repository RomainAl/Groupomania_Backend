const express = require('express');
const router = express.Router();
const subjectCtrl = require('../controllers/subject');
const auth = require("../middleware/auth");

// Create a new Tutorial
router.post("/", auth, subjectCtrl.create);

// Retrieve all Tutorials
router.get("/", auth, subjectCtrl.findAll);

// Retrieve all published Tutorials
router.get("/published", auth, subjectCtrl.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", auth, subjectCtrl.findOne);

// Update a Tutorial with id
router.put("/:id", auth, subjectCtrl.update);

// Delete a Tutorial with id
router.delete("/:id", auth, subjectCtrl.delete);

// Delete all Tutorials
router.delete("/", auth, subjectCtrl.deleteAll);

module.exports = router;
