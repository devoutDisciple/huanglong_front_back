const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('posts', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    desc: {
      type: Sequelize.STRING(3000),
      allowNull: true
    },
    img_urls: {
      type: Sequelize.STRING(3000),
      allowNull: true
    }
  }, {
    tableName: 'posts',
    timestamps: false,
    });
};
