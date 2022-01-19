//-------------------------
// Routers pour les subjects
//-------------------------
const express = require('express');
const router = express.Router();
const subjectCtrl = require('../controllers/subject');
const auth = require("../middleware/auth");
const multer = require('../controllers/file.controller');

// Create a new Subject
router.post("/", auth, multer.upload, subjectCtrl.create);

// Retrieve all Subjects
router.get("/", auth, subjectCtrl.findAll);

// Retrieve all published Subjects
router.get("/published", auth, subjectCtrl.findAllPublished);

// Retrieve a single Subject with id
router.get("/:id", auth, subjectCtrl.findOne);

// Update a Subject with id
router.put("/:id", auth, multer.upload, subjectCtrl.update);

// Delete a Subject with id
router.delete("/:id", auth, subjectCtrl.delete);

// Delete all Subjects
router.delete("/", auth, subjectCtrl.deleteAll);

module.exports = router;
