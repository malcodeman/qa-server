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

export async function findOnLogin(username) {
  try {
    const Operator = Op;
    const user = await User.findOne({
      where: {
        [Operator.or]: [{ email: username }, { username }]
      },
      attributes: ["id", "password"]
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function findMe(id) {
  try {
    const me = await User.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["password"]
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

    return me;
  } catch (error) {
    throw error;
  }
}

export async function findById(id) {
  try {
    const user = await User.findOne({
      where: {
        id
      }
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function findByEmail(email) {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function findByUsername(username) {
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  findOnLogin,
  findMe,
  findById,
  findByEmail,
  findByUsername
};
