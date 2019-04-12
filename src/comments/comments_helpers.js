import Comment from "./comments_model.js";
import User from "../users/users_model.js";

export async function findComment(id) {
  const comment = await Comment.findOne({
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

  return comment;
}
