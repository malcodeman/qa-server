import Sequelize from "sequelize";

import sequelize from "../connection.mjs";
import Answer from "../answers/answers_model.mjs";

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

export default Question;
