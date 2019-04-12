import Comment from "./comments_model.js";

import { findComment } from "./comments_helpers";

export async function createQuestionComment(req, res, next) {
  try {
    const { body, questionId } = req.body;
    const comment = await Comment.create({
      userId: req.userId,
      questionId,
      body
    });

    res.status(200).send(await findComment(comment.id));
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

    res.status(200).send(await findComment(comment.id));
  } catch (error) {
    res.status(400).send(error);
  }
}
