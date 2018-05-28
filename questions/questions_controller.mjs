import Question from "./questions_model.mjs";
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

export async function getAll(req, res, next) {
  try {
    const questions = await Question.findAll();
    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
}
