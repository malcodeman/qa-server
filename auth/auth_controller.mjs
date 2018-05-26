import jwt from "jsonwebtoken";

import User from "../users/users_model.mjs";

export async function signup(req, res, next) {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400
    });
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const password = req.body.password;
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
