const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('circle_feedback', {
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
    plate_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    desc: {
      type: Sequelize.STRING(255),
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
    tableName: 'circle_feedback',
    timestamps: false,
    });
};
