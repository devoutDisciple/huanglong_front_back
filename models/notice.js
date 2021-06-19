const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('notice', {
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
    title: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    desc: {
      type: Sequelize.STRING(8000),
      allowNull: true
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
    is_delete: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'notice',
    timestamps: false,
    });
};
