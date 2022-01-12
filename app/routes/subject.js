const express = require('express');
const router = express.Router();
const subjectCtrl = require('../controllers/subject');
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

// Create a new Subject
router.post("/", auth, multer, subjectCtrl.create);

// Retrieve all Subjects
router.get("/", auth, subjectCtrl.findAll);

// Retrieve all published Subjects
router.get("/published", auth, subjectCtrl.findAllPublished);

// Retrieve a single Subject with id
router.get("/:id", auth, subjectCtrl.findOne);

// Update a Subject with id
router.put("/:id", auth, multer, subjectCtrl.update);

// Delete a Subject with id
router.delete("/:id", auth, subjectCtrl.delete);

// Delete all Subjects
router.delete("/", auth, subjectCtrl.deleteAll);

module.exports = router;
