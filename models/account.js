const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('account', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    account: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    role: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    is_delete: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'account',
    timestamps: false,
    });
};
