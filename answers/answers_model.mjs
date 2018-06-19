import Sequelize from "sequelize";

import Upvote from "../upvotes/upvotes_model.mjs";
import sequelize from "../connection.mjs";
import Comment from "../comments/comments_model.mjs";

const Answer = sequelize.define("answer", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

Answer.hasMany(Upvote);
Answer.hasMany(Comment);

Upvote.belongsTo(Answer);
Comment.belongsTo(Answer);

export default Answer;
