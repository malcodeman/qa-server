import Sequelize from "sequelize";

import sequelize from "../connection.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../votes/upvotes_model.mjs";
import Downvote from "../votes/downvotes_model.mjs";

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
Question.hasMany(Downvote);

export default Question;
