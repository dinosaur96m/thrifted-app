'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.item.belongsTo(models.user, {hooks: true})
      models.item.belongsTo(models.cart)
    }
  };
  item.init({
    size: DataTypes.STRING,
    type: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.REAL,
    imgUrl: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};