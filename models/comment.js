//-----------------------------------
// Schema model MySQL pour les commentaires
//-----------------------------------
module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
            args: [1, 255],
            msg: 'Your comment may be between 1 to 255 characters only.'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  });

  return Comment;
};
