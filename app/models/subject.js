module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define("subject", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Subject;
};
