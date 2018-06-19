import Sequelize from "sequelize";

import sequelize from "../connection.mjs";

const Comment = sequelize.define("comment", {
  body: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default Comment;
