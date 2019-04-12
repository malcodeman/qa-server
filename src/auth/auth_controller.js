import jwt from "jsonwebtoken";
import argon from "argon2";

import {
  create,
  findOnLogin,
  findByEmail,
  findByUsername,
  findMe
} from "../users/users_helpers";

export async function signup(req, res, next) {
  try {
    const { email, name, username, password } = req.body;
    const hash = await argon.hash(password);
    const user = await create(email, name, username, hash);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400
    });
    const me = await findMe(user.id);

    res.status(200).send({ token, user: me });
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
    const user = await findOnLogin(username);

    if (!user) {
      res.status(400).send({ exception: "UserNotFoundException" });
      return;
    }
    if (await argon.verify(user.password, password)) {
      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: 86400
      });
      const me = await findMe(user.id);

      res.status(200).send({ token, user: me });
    } else {
      res.status(401).send({ exception: "NotAuthorizedException" });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}

export async function validateEmail(req, res, next) {
  try {
    const { email } = req.body;
    const user = await findByEmail(email);

    if (user) {
      res.status(200).send({ exists: true });
    } else {
      res.status(200).send({ exists: false });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}

export async function validateUsername(req, res, next) {
  try {
    const { username } = req.body;
    const user = await findByUsername(username);

    if (user) {
      res.status(200).send({ exists: true });
    } else {
      res.status(200).send({ exists: false });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}
