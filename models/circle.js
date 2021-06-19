const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('circle', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plate_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    fellow: {
      type: Sequelize.INTEGER(255),
      allowNull: true,
      defaultValue: '0'
    },
    blogs: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    posts: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    vote: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    battle: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    videos: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    hot: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    province: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    city: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    country: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    logo: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: 'logo.png'
    },
    bg_url: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: 'bg.png'
    },
    sort: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
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
    tableName: 'circle',
    timestamps: false,
    });
};
