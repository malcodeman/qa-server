import Sequelize from "sequelize";

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

export default Answer;
