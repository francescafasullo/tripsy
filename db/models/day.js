'use strict'

const { STRING, INTEGER } = require('sequelize')

module.exports = db => db.define('days', {
  number: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports.associations = (Day, {DayHotel, Trip}) => {
  Day.belongsTo(DayHotel, {through: DayHotel})
  Day.belongsTo(Trip)
}
