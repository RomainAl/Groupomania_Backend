//-----------------------------------
// Schema model MySQL pour les subjects
//-----------------------------------
module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define("subjects", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
            args: [1, 30],
            msg: 'Your title may be 2 to 30 characters only.'
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
            args: [1, 50],
            msg: 'Your description may be 2 to 50 characters only.'
        }
      }
    },
    text: {
      type: Sequelize.STRING(1234),
      allowNull: false,
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
