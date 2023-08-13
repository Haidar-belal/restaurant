'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Item, {
        foreignKey: 'item_id',
      });
    }
  }
  Photo.init({
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""

    }
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};