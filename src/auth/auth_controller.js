import jwt from "jsonwebtoken";

import { findUser, create } from "../users/users_controller.js";

export async function signup(req, res, next) {
  try {
    const { email, name, username, password } = req.body;
    let user = await create(email, name, username, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400
    });
    user = await findUser(null, user.username);
    res.status(200).send({ token, user });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await findUser(null, username);
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
    const user = await findUser(decoded.id, null);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}
