'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('day_restaurants')

module.exports.associations = (DayRestaurant, {Day, Restaurant}) => {
  // DayRestaurant.belongsTo(Day)
  DayRestaurant.belongsTo(Restaurant)
}
