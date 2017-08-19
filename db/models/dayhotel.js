'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('day_hotels')

module.exports.associations = (DayHotel, {Day, Hotel}) => {
  DayHotel.hasOne(Day)
  DayHotel.hasOne(Hotel)
}
