const express = require('express');
const router = express.Router();
const {getResultByQuizId} = require("../controllers/report.controller")
router.route("/:id").get(getResultByQuizId)
module.exports = router;
