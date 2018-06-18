import jwt from "jsonwebtoken";
import Sequelize from "sequelize";

import User from "../users/users_model.mjs";

const Op = Sequelize.Op;

export async function signup(req, res, next) {
  try {
    const { email, name, username, password } = req.body;
    const user = await User.create({
      email,
      name,
      username,
      password
    });
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400
    });
    const newUser = await User.findOne({
      where: {
        id: user.dataValues.id
      },
      attributes: {
        exclude: ["password"]
      }
    });
    res.status(200).send({ token, user: newUser });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    // Username can be email or username
    // if either one is correct user can login
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username }]
      }
    });
    if (password === user.password) {
      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: 86400
      });
      res.status(200).send({ token, user });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function logout(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");
    const user = await User.findById(decoded.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}
