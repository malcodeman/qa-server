import Answer from "./answers_model.mjs";
import User from "../users/users_model.mjs";
import sequelize from "../connection.mjs";

export async function create(req, res, next) {
  try {
    const { body, questionId } = req.body;
    const answer = await Answer.create({
      body,
      questionId,
      userId: req.userId
    });
    const { id } = answer.dataValues;
    res.status(200).send(await Answer.find({ where: { id }, include: [User] }));
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
