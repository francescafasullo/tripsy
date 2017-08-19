'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('hotels', {
  name: STRING,
})

module.exports.associations = (Hotel, {Place}) => {
  Hotel.belongsTo(Place)
}
