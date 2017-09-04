'use strict'

const {STRING, DATEONLY} = require('sequelize')

module.exports = db => db.define('trips', {
  name: STRING,
  start: DATEONLY,
  end: DATEONLY
})

module.exports.associations = (Trip, {User, Day, Restaurant, Hotel, Activity}) => {
  Trip.belongsTo(User)
  Trip.hasMany(Day)
  Trip.hasMany(Restaurant)
  Trip.hasMany(Hotel)
  Trip.hasMany(Activity)
}
