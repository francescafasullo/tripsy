'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('hotels', {
  name: STRING,
})

module.exports.associations = (Hotel, {Place, Day, DayHotel}) => {
  Hotel.belongsTo(Place)
  Hotel.belongsToMany(Day, {through: DayHotel})
}
