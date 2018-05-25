import Sequelize from "sequelize";

import sequelize from "../connection.mjs";

const Question = sequelize.define("question", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default Question;
