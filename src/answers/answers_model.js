import Sequelize from "sequelize";

import Upvote from "../upvotes/upvotes_model.js";
import sequelize from "../connection.js";
import Comment from "../comments/comments_model.js";

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
