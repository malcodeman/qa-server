import Comment from "./comments_model.js";
import User from "../users/users_model.js";

async function findComment(id) {
  const comment = await Comment.findOne({
    where: {
      id
    },
    include: [
      {
        model: User,
        attributes: ["username"]
      }
    ]
  });

  return comment;
}

export async function createQuestionComment(req, res, next) {
  try {
    const { body, questionId } = req.body;
    const comment = await Comment.create({
      userId: req.userId,
      questionId,
      body
    });
    const { id } = comment.dataValues;

    res.status(200).send(await findComment(id));
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function createAnswerComment(req, res, next) {
  try {
    const { body, answerId } = req.body;
    const comment = await Comment.create({
      userId: req.userId,
      answerId,
      body
    });
    const { id } = comment.dataValues;

    res.status(200).send(await findComment(id));
  } catch (error) {
    res.status(400).send(error);
  }
}
