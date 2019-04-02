import Sequelize from "sequelize";

import sequelize from "../connection.js";
import Question from "../questions/questions_model.js";
import Answer from "../answers/answers_model.js";
import Upvote from "../upvotes/upvotes_model.js";
import Comment from "../comments/comments_model.js";

const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  username: {
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
  },
  nameFirstLetter: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  profilePhotoURL: {
    type: Sequelize.STRING,
    defaultValue: null
  }
});

User.hasMany(Question);
User.hasMany(Answer);
User.hasMany(Upvote);
User.hasMany(Comment);

Question.belongsTo(User);
Answer.belongsTo(User);
Upvote.belongsTo(User);
Comment.belongsTo(User);

export default User;
