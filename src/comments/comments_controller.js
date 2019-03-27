import Comment from "./comments_model.js";
import User from "../users/users_model.js";

export async function create(req, res, next) {
  try {
    const { body, questionId, answerId } = req.body;
    if (questionId) {
      let comment = await Comment.create({
        body,
        userId: req.userId,
        questionId: 1
      });
      const { id } = comment.dataValues;
      comment = await Comment.findOne({
        where: {
          id
        },
        include: [
          {
            model: User,
            attributes: ["username"]
          }
        ]
      });
      res.status(200).send(comment);
    } else if (answerId) {
      let comment = await Comment.create({
        body,
        userId: req.userId,
        answerId
      });
      const { id } = comment.dataValues;
      comment = await Comment.findOne({
        where: {
          id
        },
        include: [
          {
            model: User,
            attributes: ["username"]
          }
        ]
      });
      res.status(200).send(comment);
    }
  } catch (error) {
    res.status(400).send(error);
  }
}
