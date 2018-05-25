import Sequelize from "sequelize";

const sequelize = new Sequelize("qa", "root", "toor", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.sync();

export default sequelize;
