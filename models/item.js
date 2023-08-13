'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'category_id'
        }
      });
      this.belongsToMany(models.Tag, {
        foreignKey: {
          name: 'item_id'
        },
        through: models.ItemTag
      });
      this.belongsToMany(models.Ingredient, {
        foreignKey: 'item_id',
        through: models.ItemIngredient
      });
      this.hasMany(models.Photo, {
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Item.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_ar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""


    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""


    },
    name_dw: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""


    },
    details_ar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""


    },
    details_en: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""


    },
    details_dw: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""


    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};