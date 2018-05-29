import Sequelize from "sequelize";

import sequelize from "../connection.mjs";

const Downvote = sequelize.define("downvote", {});

export default Downvote;
