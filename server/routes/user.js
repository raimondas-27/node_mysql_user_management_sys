const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();



router.get("/", userController.view);

router.post("/", userController.find);

router.get("/adduser", userController.form);




module.exports = router;