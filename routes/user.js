//-------------------------
// Routers pour les users
//-------------------------

const express = require('express');
const auth = require("../middleware/auth");

const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get("/", auth, userCtrl.findAll);
router.get("/:id", auth, userCtrl.findOne);
router.put("/:id", auth, userCtrl.update);
router.delete("/:id", auth, userCtrl.delete);

module.exports = router;