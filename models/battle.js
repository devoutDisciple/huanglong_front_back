const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('battle', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    red_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    red_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    blue_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    blue_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    red_ticket: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    blue_ticket: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    },
    dead_time: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'battle',
    timestamps: false,
    });
};
