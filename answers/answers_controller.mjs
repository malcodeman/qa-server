import Answer from "./answers_model.mjs";
import sequelize from "../connection.mjs";

export async function create(req, res, next) {
  try {
    const answer = await Answer.create({
      body: req.body.body,
      questionId: req.body.questionId
    });
    res.status(200).send(answer);
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
