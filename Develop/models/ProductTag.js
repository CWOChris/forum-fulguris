const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

ProductTag.associate = (models) => {
  ProductTag.belongsTo(models.Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
  });
  ProductTag.belongsTo(models.Tag, {
    foreignKey: 'tag_id',
    onDelete: 'CASCADE',
  });
};

module.exports = ProductTag;
