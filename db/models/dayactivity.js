'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('day_activities')

module.exports.associations = (DayActivity, {Day, Activity}) => {
  DayActivity.belongsTo(Day)
  DayActivity.belongsTo(Activity)
}
