import Answer from "./answers_model.js";

import { findAnswer } from "./answers_helpers";

export async function create(req, res, next) {
  try {
    const { body, questionId } = req.body;
    const answer = await Answer.create({
      body,
      questionId,
      userId: req.userId
    });

    res.status(200).send(await findAnswer(answer.id));
  } catch (error) {
    res.status(400).send(error);
  }
}
