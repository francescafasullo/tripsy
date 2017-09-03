'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('restaurants', {
  name: STRING,
})

module.exports.associations = (Restaurant, {Place, Day, DayRestaurant}) => {
  Restaurant.belongsTo(Place)
  Restaurant.belongsToMany(Day, {through: DayRestaurant})
}
