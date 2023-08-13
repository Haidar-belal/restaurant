'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemIngredient.init({
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    }
  }, {
    sequelize,
    modelName: 'ItemIngredient',
  });
  return ItemIngredient;
};