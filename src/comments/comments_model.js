import { TEXT } from "sequelize";

import sequelize from "../connection.js";

const Comment = sequelize.define("comment", {
  body: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default Comment;
