import User from "./users_model.mjs";
import Question from "../questions/questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../upvotes/upvotes_model.mjs";

export async function findById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Question
        },
        {
          model: Answer
        },
        {
          model: Upvote
        }
      ]
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAll(req, res, next) {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findMe(req, res, next) {
  try {
    const id = req.userId;
    const me = await User.findAll({
      where: { id },
      attributes: {
        exclude: ["password"]
      }
    });
    res.status(200).send(me[0]);
  } catch (error) {
    res.status(400).send(error);
  }
}
