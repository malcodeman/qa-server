import sequelize from "../connection.js";

import Question from "./questions_model.js";
import Answer from "../answers/answers_model.js";
import Upvote from "../upvotes/upvotes_model.js";
import User from "../users/users_model.js";
import Comment from "../comments/comments_model.js";

export async function create(req, res, next) {
  try {
    const question = await Question.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.userId
    });

    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAll(req, res, next) {
  try {
    const questions = await sequelize.query(
      `
    SELECT questions.id, questions.createdAt, questions.title, users.username as author,
    (SELECT COUNT(upvotes.id) FROM upvotes WHERE upvotes.questionId = questions.id) as upvotesCount,
    (SELECT COUNT(answers.id) FROM answers WHERE answers.questionId = questions.id) as answersCount
    FROM questions
    INNER JOIN users ON users.id = questions.userId
    ORDER BY questions.createdAt DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );

    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findById(req, res, next) {
  try {
    const { id } = req.params;
    const question = await Question.findOne({
      attributes: ["id", "title", "body", "createdAt"],
      where: {
        id
      },
      include: [
        {
          attributes: ["id", "body", "createdAt"],
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username", "profilePhotoURL"]
            }
          ]
        },
        {
          attributes: ["id", "body", "createdAt"],
          model: Answer,
          include: [
            {
              model: User,
              attributes: ["username", "profilePhotoURL", "nameFirstLetter"]
            },
            {
              model: Comment,
              attributes: ["id", "body", "createdAt"],
              include: [
                {
                  model: User,
                  attributes: ["username"]
                }
              ]
            }
          ]
        },
        {
          attributes: ["username", "profilePhotoURL", "nameFirstLetter"],
          model: User
        }
      ]
    });
    async function upvoted(questionId) {
      const upvote = await Upvote.findOne({
        attributes: ["id"],
        where: {
          questionId,
          userId: req.userId
        }
      });
      if (upvote) {
        return Object({ upvoteId: upvote.dataValues.id });
      } else {
        return false;
      }
    }
    async function upvotesCount(questionId) {
      const upvotes = await Upvote.count({
        where: {
          questionId
        }
      });
      return upvotes;
    }

    question.dataValues.upvoted = await upvoted(question.dataValues.id);
    question.dataValues.upvotesCount = await upvotesCount(
      question.dataValues.id
    );
    question.dataValues.owner = await Question.count({
      where: {
        id,
        userId: req.userId
      }
    });
    async function upvotesCountAnswers(answerId) {
      const upvotes = await Upvote.count({
        where: {
          answerId
        }
      });
      return upvotes;
    }
    async function upvotedAnswer(answerId) {
      const upvote = await Upvote.findOne({
        attributes: ["id"],
        where: {
          answerId,
          userId: req.userId
        }
      });
      if (upvote) {
        return Object({ upvoteId: upvote.dataValues.id });
      } else {
        return false;
      }
    }
    for (let i = 0; i < question.answers.length; ++i) {
      question.answers[i].dataValues.upvotesCount = await upvotesCountAnswers(
        question.answers[i].dataValues.id
      );
      question.answers[i].dataValues.upvoted = await upvotedAnswer(
        question.answers[i].dataValues.id
      );
      let answerId = question.answers[i].dataValues.id;
      question.answers[i].dataValues.owner = await Answer.count({
        where: {
          id: answerId,
          userId: req.userId,
          questionId: id
        }
      });
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
}
