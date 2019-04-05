import sequelize from "sequelize";

import Answer from "./answers_model.js";
import User from "../users/users_model.js";
import Upvote from "../upvotes/upvotes_model.js";
import Comment from "../comments/comments_model.js";

async function findAnswer(id) {
  const answer = await Answer.findOne({
    where: {
      id
    },
    include: [
      {
        model: User,
        attributes: ["username", "profilePhotoURL"]
      },
      { model: Comment }
    ]
  });

  return answer;
}

export async function create(req, res, next) {
  try {
    const { body, questionId } = req.body;
    const answer = await Answer.create({
      body,
      questionId,
      userId: req.userId
    });
    const { id } = answer.dataValues;

    res.status(200).send(await findAnswer(id));
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAll(req, res, next) {
  try {
    const answers = await Answer.findAll();

    res.status(200).send(answers);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function createUpvoteAnswer(req, res, next) {
  try {
    const { questionId, answerId } = req.body;
    const { userId } = req;
    const upvote = await Upvote.create({
      answerId,
      userId
    });

    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}
