import Sequelize from "sequelize";

import User from "./users_model.mjs";
import Question from "../questions/questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../upvotes/upvotes_model.mjs";

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
    console.log(error);
  }
}

export async function findUser(id, username) {
  try {
    const Op = Sequelize.Op;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ id }, { email: username }, { username }]
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
    console.log(error);
  }
}

export async function findByUsername(req, res, next) {
  try {
    const { username } = req.params;
    const user = await findUser(null, username);
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

export async function updateTheme(req, res, next) {
  try {
    const id = req.userId;
    const { theme } = req.body;
    if (theme != "light" && theme != "dark") {
      return res.json({ code: 400, message: "Unexisting theme" });
    }
    const me = await findUser(id, null);
    me.update({ theme });
    res.status(200).send(me);
  } catch (error) {
    res.status(400).send(error);
  }
}
