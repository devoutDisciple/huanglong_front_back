const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user_attention_circle', {
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
    circle_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    },
    self_school: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '2'
    },
    is_delete: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'user_attention_circle',
    timestamps: false,
    });
};
