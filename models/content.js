const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('content', {
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
    circle_ids: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '[]'
    },
    circle_names: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '[]'
    },
    topic_ids: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '[]'
    },
    topic_names: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '[]'
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
    goods: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    comment: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    share: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
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
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'content',
    timestamps: false,
    });
};
