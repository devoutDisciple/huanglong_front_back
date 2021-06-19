const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('battle_record', {
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
    content_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'battle_record',
    timestamps: false,
    });
};
