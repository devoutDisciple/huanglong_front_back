const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('video', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    photo: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    width: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    height: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    duration: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    size: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    desc: {
      type: Sequelize.STRING(500),
      allowNull: true
    }
  }, {
    tableName: 'video',
    timestamps: false,
    });
};
