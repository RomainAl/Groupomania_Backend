const express = require('express');
const router = express.Router();
const subjectCtrl = require('../controllers/subject');

// Create a new Tutorial
router.post("/", subjectCtrl.create);

// Retrieve all Tutorials
router.get("/", subjectCtrl.findAll);

// Retrieve all published Tutorials
router.get("/published", subjectCtrl.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", subjectCtrl.findOne);

// Update a Tutorial with id
router.put("/:id", subjectCtrl.update);

// Delete a Tutorial with id
router.delete("/:id", subjectCtrl.delete);

// Delete all Tutorials
router.delete("/", subjectCtrl.deleteAll);

module.exports = router;
