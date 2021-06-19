const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('address', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    parent_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    sort: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    is_delete: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'address',
    timestamps: false,
    });
};
