// models/index.js
import { Sequelize, DataTypes } from "sequelize";
import taskModel from "./task.js";
import { config } from "../config/config.js";

const { username, password, database, host, port, dialect, dialectOptions } =
  config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  dialectOptions,
});

const Task = taskModel(sequelize, DataTypes);

// Optional: Define associations between models if needed
// Example:
// User.associate = (models) => {
//   // Define associations here
// };

export { sequelize, Task };
