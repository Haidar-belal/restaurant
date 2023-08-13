'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Item, {
        foreignKey: 'ingredient_id',
        through: models.ItemIngredient
      });
    }
  }
  Ingredient.init({
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

    }
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};