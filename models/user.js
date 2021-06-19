const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    wx_openid: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    phone: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    photo: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: 'photo.png'
    },
    bg_url: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: 'bg.png'
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: true
    },
    sex: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '浙江省 杭州市 西湖区'
    },
    school: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    level: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '高一'
    },
    sign: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    goods: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    fans: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    fellow: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    publish: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    integral: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '0'
    },
    type: {
      type: Sequelize.STRING(255),
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
    disable: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    is_delete: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'user',
    timestamps: false,
    });
};
