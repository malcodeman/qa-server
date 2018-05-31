import Question from "./questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../votes/upvotes_model.mjs";
import Downvote from "../votes/downvotes_model.mjs";
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

export async function createUpvoteQuestion(req, res, next) {
  try {
    const { questionId } = req.body;
    const { userId } = req;
    const upvote = await Upvote.create({
      questionId,
      userId
    });
    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function createDownvoteQuestion(req, res, next) {
  try {
    const { questionId } = req.body;
    const { userId } = req;
    const downvote = await Downvote.create({
      questionId,
      userId
    });
    res.status(200).send(downvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAll(req, res, next) {
  try {
    const questions = await Question.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Answer,
          include: [{ model: Upvote }, { model: Downvote }]
        },
        {
          model: Upvote
        },
        {
          model: Downvote
        },
        {
          model: User
        }
      ]
    });
    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findById(req, res, next) {
  try {
    const { id } = req.params;
    const question = await Question.findAll({
      where: { id },
      include: [
        {
          model: Answer,
          include: [{ model: User }, { model: Upvote }, { model: Downvote }]
        },
        {
          model: Upvote
        },
        {
          model: Downvote
        },
        {
          model: User
        }
      ],
      order: [[Answer, "id", "ASC"]]
    });
    res.status(200).send(question[0]);
  } catch (error) {
    res.status(400).send(error);
  }
}
// TODO
export async function updateById(req, res, next) {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    const { num_votes } = question.dataValues;
    await question.update({ num_votes: num_votes + 1 });
    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
}
