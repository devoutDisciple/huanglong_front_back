const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('circle_feedback', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "用户id"
    },
    plate_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "模块id"
    },
    desc: {
      type: Sequelize.STRING(255),
      allowNull: true,
      comment: "描述内容"
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true
    },
    is_delete: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'circle_feedback',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
