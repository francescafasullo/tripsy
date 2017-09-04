'use strict'

const { STRING, INTEGER } = require('sequelize')
const DayHotel = require('./dayhotel')
const DayRestaurant = require('./dayrestaurant')
const DayActivity = require('./dayactivity')
const Restaurant = require('./Restaurant')

module.exports = db => db.define('days', {
  number: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports.associations = (Day, {Hotel, Restaurant, Activity, Trip, DayHotel, DayRestaurant, DayActivity}) => {
  Day.belongsTo(Trip)
  Day.belongsToMany(Hotel, {through: DayHotel})
  Day.belongsToMany(Restaurant, {through: DayRestaurant})
  Day.belongsToMany(Activity, {through: DayActivity})
}
