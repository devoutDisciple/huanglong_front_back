const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('goods_record', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    other_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    content_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    comment_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'goods_record',
    timestamps: false,
    });
};
