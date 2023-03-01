const express = require('express');
const { getAllQuizzes, createQuiz, getQuizById, EditQuiz } = require('../controllers/quiz.controller');

const router = express.Router();

router.route("/").get(getAllQuizzes).post(createQuiz);
router.route("/:id").get(getQuizById).put(EditQuiz)
module.exports = router;