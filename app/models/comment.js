module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [1,300]
    }
  });

  return Comment;
};
