const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('album', {
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
    url: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: '{}'
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
    tableName: 'album',
    timestamps: false,
    });
};
