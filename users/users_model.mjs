import Sequelize from "sequelize";

import sequelize from "../connection.mjs";
import Question from "../questions/questions_model.mjs";
import Answer from "../answers/answers_model.mjs";
import Upvote from "../votes/upvotes_model.mjs";
import Downvote from "../votes/downvotes_model.mjs";

const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

User.hasMany(Question);
Question.belongsTo(User);
User.hasMany(Answer);
Answer.belongsTo(User);
User.hasMany(Upvote);
Upvote.belongsTo(User);
User.hasMany(Downvote);
Downvote.belongsTo(User);

export default User;
