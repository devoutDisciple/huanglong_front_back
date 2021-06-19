const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('vote', {
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
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    content: {
      type: Sequelize.STRING(800),
      allowNull: false
    },
    total: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'vote',
    timestamps: false,
    });
};
