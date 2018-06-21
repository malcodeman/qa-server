import User from "./users_model.mjs";
import Question from "../questions/questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../upvotes/upvotes_model.mjs";

import Sequelize from "sequelize";

const Op = Sequelize.Op;

export async function findUser(id, username) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ id }, { email: username }, { username }]
      },
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
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function findByUsername(req, res, next) {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
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
    const me = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "updatedAt"]
      },
      include: [
        {
          model: Question,
          attributes: ["id", "createdAt"]
        },
        {
          model: Answer,
          attributes: ["id", "createdAt"]
        },
        {
          model: Upvote,
          attributes: ["id", "createdAt"]
        }
      ]
    });
    res.status(200).send(me);
  } catch (error) {
    res.status(400).send(error);
  }
}
