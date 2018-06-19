import Sequelize from "sequelize";

import sequelize from "../connection.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../upvotes/upvotes_model.mjs";
import Comment from "../comments/comments_model.mjs";

const Question = sequelize.define("question", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

Question.hasMany(Answer);
Question.hasMany(Upvote);
Question.hasMany(Comment);

Upvote.belongsTo(Question);
Answer.belongsTo(Question);
Comment.belongsTo(Question);

export default Question;
