import Sequelize from "sequelize";

import sequelize from "../connection.mjs";

const Comment = sequelize.define("comment", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default Comment;
