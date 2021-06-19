const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('comment_record', {
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
    comment_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    img_urls: {
      type: Sequelize.STRING(600),
      allowNull: true,
      defaultValue: '[]'
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    desc: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    goods: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    share: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    comment: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
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
    tableName: 'comment_record',
    timestamps: false,
    });
};
