import Sequelize from "sequelize";

import Upvote from "../votes/upvotes_model.mjs";
import Downvote from "../votes/downvotes_model.mjs";
import sequelize from "../connection.mjs";

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
Answer.hasMany(Downvote);

export default Answer;
