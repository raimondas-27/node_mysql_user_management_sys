const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();



router.get("/", userController.view);

router.post("/", userController.find);


module.exports = router;