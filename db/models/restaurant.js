'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('restaurants', {
  name: STRING,
})

module.exports.associations = (Restaurant, {Place}) => {
  Restaurant.belongsTo(Place)
}
