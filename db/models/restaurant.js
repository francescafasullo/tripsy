'use strict'

const {STRING, ARRAY, DOUBLE} = require('sequelize')

module.exports = db => db.define('restaurants', {
  name: STRING,
  street: {
    type: STRING,
    allowNull: false
  },
  city: {
    type: STRING,
    allowNull: false
  },
  state: STRING,
  country: {
    type: STRING
  },
  phone: STRING,
  location: {
    type: ARRAY(DOUBLE),
    allowNull: false
  }
})

module.exports.associations = (Restaurant, {Day, DayRestaurant}) => {
  Restaurant.belongsToMany(Day, {through: DayRestaurant})
}
