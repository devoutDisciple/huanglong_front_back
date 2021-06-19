const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('topic', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    circle_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    hot: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    sort: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
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
    tableName: 'topic',
    timestamps: false,
    });
};
