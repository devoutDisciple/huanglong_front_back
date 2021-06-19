const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('vote_record', {
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
    select_items: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '[]'
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'vote_record',
    timestamps: false,
    });
};
