import { STRING, TEXT } from "sequelize";

import sequelize from "../connection.js";
import Answer from "../answers/answers_model.js";
import Upvote from "../upvotes/upvotes_model.js";
import Comment from "../comments/comments_model.js";

const Question = sequelize.define("question", {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  body: {
    type: TEXT,
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
