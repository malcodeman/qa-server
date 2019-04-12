import Answer from "./answers_model.js";
import User from "../users/users_model.js";
import Comment from "../comments/comments_model.js";

export async function findAnswer(id) {
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
