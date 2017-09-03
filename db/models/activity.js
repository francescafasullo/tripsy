'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('activities', {
  name: STRING,
})

module.exports.associations = (Activity, {Place, Day, DayActivity}) => {
  Activity.belongsTo(Place)
  Activity.belongsToMany(Day, {through: DayActivity})
}
