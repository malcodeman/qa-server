import User from "./users_model.js";
import Question from "../questions/questions_model.js";
import Answer from "../answers/answers_model.js";
import Upvote from "../upvotes/upvotes_model.js";
import helpers from "./users_helpers";

export async function findByUsername(req, res, next) {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username
      },
      attributes: {
        exclude: ["email", "password", "updatedAt"]
      },
      include: [
        {
          model: Question,
          include: [
            {
              attributes: ["id"],
              model: Upvote
            }
          ]
        },
        {
          model: Answer
        },
        {
          model: Upvote
        }
      ]
    });
    if (!user) {
      res.status(400).send({ exception: "UserNotFoundException" });
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAll(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["email", "password", "updatedAt"]
      }
    });

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findMe(req, res, next) {
  try {
    const id = req.userId;
    const me = await helpers.findMe(id);

    res.status(200).send(me);
  } catch (error) {
    res.status(400).send(error);
  }
}
