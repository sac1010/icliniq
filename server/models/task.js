// models/task.js
const taskModel = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Task;
};

export default taskModel;
