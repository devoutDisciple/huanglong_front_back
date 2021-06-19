const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('view_record', {
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
    other_id: {
      type: Sequelize.INTEGER(11),
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
    tableName: 'view_record',
    timestamps: false,
    });
};
