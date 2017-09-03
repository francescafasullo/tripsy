'use strict'

const { STRING, INTEGER } = require('sequelize')
const DayHotel = require('./dayhotel')
const DayRestaurant = require('./dayrestaurant')
const DayActivity = require('./dayactivity')
const Place = require('./place')
const Restaurant = require('./Restaurant')

module.exports = db => db.define('days', {
  number: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports.associations = (Day, {Hotel, Restaurant, Activity, DayHotel, DayRestaurant, DayActivity, Trip}) => {
  Day.belongsTo(Trip)
  Day.belongsTo(Hotel, {through: DayHotel})
  Day.belongsToMany(Restaurant, {through: DayRestaurant})
  Day.belongsToMany(Activity, {through: DayActivity})
}
