import Sequelize from "sequelize";

import Upvote from "../upvotes/upvotes_model.mjs";
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

export default Answer;
