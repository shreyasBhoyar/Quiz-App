const express = require('express');
const {getResultById, getAllUsers,verifyUser, createUser, removeCorrectOptions, quizForUser, submitQuiz, addAttemptedQuizToUser } = require('../controllers/user.controller');

const router = express.Router();

router.route("/").get(getAllUsers).post(verifyUser,createUser);
router.route("/quiz/:quizId").get(removeCorrectOptions,quizForUser)
router.route("/:userId/quiz/:quizId").post(submitQuiz,addAttemptedQuizToUser)
router.route("/result/:id").get(getResultById)
module.exports = router;