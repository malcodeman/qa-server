import User from "./users_model.mjs";

export async function get(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}
