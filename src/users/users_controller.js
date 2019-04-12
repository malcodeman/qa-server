import { Op } from "sequelize";

import User from "./users_model.js";
import Question from "../questions/questions_model.js";
import Answer from "../answers/answers_model.js";
import Upvote from "../upvotes/upvotes_model.js";

export async function create(email, name, username, password) {
  try {
    const nameFirstLetter = name[0];
    const user = await User.create({
      email,
      name,
      username,
      password,
      nameFirstLetter
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function findUser(id, username) {
  try {
    const Operator = Op;
    const user = await User.findOne({
      where: {
        [Operator.or]: [{ id }, { email: username }, { username }]
      },
      attributes: {
        exclude: ["updatedAt"]
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

    return user;
  } catch (error) {
    throw error;
  }
}

export async function findByUsername(req, res, next) {
  try {
    const { username } = req.params;
    const user = await findUser(null, username);

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
    const me = await findUser(id, null);

    res.status(200).send(me);
  } catch (error) {
    res.status(400).send(error);
  }
}
