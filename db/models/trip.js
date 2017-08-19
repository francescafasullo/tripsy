'use strict'

const {STRING, DATEONLY} = require('sequelize')

module.exports = db => db.define('trips', {
  name: STRING,
  start: DATEONLY,
  end: DATEONLY
})

module.exports.associations = (Trip, {User}) => {
  Trip.belongsTo(User)
}
