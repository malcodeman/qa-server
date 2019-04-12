import Answer from "./answers_model.js";
import User from "../users/users_model.js";
import Comment from "../comments/comments_model.js";

async function findAnswer(id) {
  const answer = await Answer.findOne({
    where: {
      id
    },
    include: [
      {
        model: User,
        attributes: ["username", "profilePhotoURL", "nameFirstLetter"]
      },
      { model: Comment }
    ]
  });
  answer.dataValues.upvoted = null;
  answer.dataValues.upvotesCount = 0;

  return answer;
}

export async function create(req, res, next) {
  try {
    const { body, questionId } = req.body;
    const answer = await Answer.create({
      body,
      questionId,
      userId: req.userId
    });
    const { id } = answer.dataValues;

    res.status(200).send(await findAnswer(id));
  } catch (error) {
    res.status(400).send(error);
  }
}
