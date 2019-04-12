import jwt from "jsonwebtoken";
import argon from "argon2";

import { create, findUser } from "../users/users_controller.js";

export async function signup(req, res, next) {
  try {
    const { email, name, username, password } = req.body;
    const hash = await argon.hash(password);
    const user = await create(email, name, username, hash);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400
    });

    res.status(200).send({ token, user });
  } catch (error) {
    if (error.errors) {
      const notUnique = error.errors.find(error => {
        return error.validatorKey === "not_unique";
      });

      if (notUnique.path === "email") {
        res.status(400).send({ exception: "EmailExistsException" });
      } else if (notUnique.path === "username") {
        res.status(400).send({ exception: "UsernameExistsException" });
      }
      return;
    }
    res.status(400).send({ exception: "general", error });
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await findUser(null, username);

    if (!user) {
      res.status(400).send({ exception: "UserNotFoundException" });
      return;
    }
    if (await argon.verify(user.password, password)) {
      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: 86400
      });

      res.status(200).send({ token, user });
    } else {
      res.status(401).send({ exception: "NotAuthorizedException" });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}
