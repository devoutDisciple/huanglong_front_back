const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('message', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    person_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    user_photo: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    },
    is_delete: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'message',
    timestamps: false,
    });
};
