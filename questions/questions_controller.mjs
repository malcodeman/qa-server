import Question from "./questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../votes/upvotes_model.mjs";
import Downvote from "../votes/downvotes_model.mjs";
import sequelize from "../connection.mjs";

export async function create(req, res, next) {
  try {
    const question = await Question.create({
      title: req.body.title,
      body: req.body.body
    });
    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function createUpvote(req, res, next) {
  try {
    const upvote = await Upvote.create({
      questionId: req.body.questionId
    });
    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function createDownvote(req, res, next) {
  try {
    const downvote = await Downvote.create({
      questionId: req.body.questionId
    });
    res.status(200).send(downvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAll(req, res, next) {
  try {
    const questions = await Question.findAll({
      include: [
        {
          model: Answer
        },
        {
          model: Upvote
        },
        {
          model: Downvote
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
          model: Answer
        },
        {
          model: Upvote
        },
        {
          model: Downvote
        }
      ]
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
