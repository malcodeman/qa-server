import Question from "./questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../upvotes/upvotes_model.mjs";
import User from "../users/users_model.mjs";
import sequelize from "../connection.mjs";

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
    const questions = await Question.findAll({
      attributes: ["id", "title", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          attributes: ["id", "username"],
          model: User
        }
      ]
    });
    async function upvotes(questionId) {
      return await Upvote.count({ where: { questionId } });
    }
    async function answers(questionId) {
      return await Answer.count({ where: { questionId } });
    }
    for (let i = 0; i < questions.length; ++i) {
      questions[i].dataValues.upvotesCount = await upvotes(
        questions[i].dataValues.id
      );
      questions[i].dataValues.answersCount = await answers(
        questions[i].dataValues.id
      );
    }
    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findById(req, res, next) {
  try {
    const { id } = req.params;
    const question = await Question.findOne({
      attributes: [
        "id",
        "title",
        "body",
        "createdAt",
        [sequelize.fn("COUNT", sequelize.col("upvotes.id")), "upvotesCount"]
      ],
      group: ["question.id", "answers.id"],
      where: {
        id
      },
      include: [
        {
          model: Upvote,
          attributes: []
        },
        {
          model: Answer
        },
        {
          attributes: ["username"],
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

    question.dataValues.upvoted = await upvoted(question.dataValues.id);

    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
}
