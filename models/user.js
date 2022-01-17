module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
            args: [2, 50],
            msg: 'Your full name may be 2 to 50 characters only.'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
            args: true,
            msg: 'Invalid email input.'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      /*validate: {
        len: {
          args: [8, 50],
          msg: 'Your full name may be 8 to 50 characters only.'
        }
      }*/
    },

    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },

    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },

    phonenumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
      /*validate: {
        isNumeric: {
            args: true,
            msg: 'The phone number must be an integer'
        }
      }*/
    },

    role: {
      type: Sequelize.STRING,
      defaultValue: 'user'
    }
  });

  return User;
};
