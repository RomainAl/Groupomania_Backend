module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      len: [2,50]
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      len: [5,50],
      validate: {
        is: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [5,50]
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user'
    }
  });

  return User;
};
