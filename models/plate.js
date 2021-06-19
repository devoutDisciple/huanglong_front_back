const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('plate', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    sort: {
      type: Sequelize.INTEGER(255),
      allowNull: false,
      defaultValue: '1'
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    link: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '2'
    },
    hot: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    },
    update_time: {
      type: Sequelize.DATE,
      allowNull: true
    },
    is_delete: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'plate',
    timestamps: false,
    });
};
