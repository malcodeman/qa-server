import Sequelize from "sequelize";

import sequelize from "../connection.mjs";

const Upvote = sequelize.define("upvote", {});

export default Upvote;
