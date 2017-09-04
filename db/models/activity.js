'use strict'

const {STRING, ARRAY, DOUBLE} = require('sequelize')

module.exports = db => db.define('activities', {
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

module.exports.associations = (Activity, {Day, DayActivity}) => {
  Activity.belongsToMany(Day, {through: DayActivity})
}
