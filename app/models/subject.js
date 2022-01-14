module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define("subject", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [1,300],
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [1,30],
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [1,300]
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Subject;
};
