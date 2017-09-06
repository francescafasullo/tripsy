const db = require('APP/db')
const Trip = db.model('trips')
const Day = db.model('days')

module.exports = require('express').Router()
  .get('/days/:dayId',
    (req, res, next) =>
      Day.findOne({
        where: {
          id: req.params.dayId
        },
        include: [{all: true}]
      })
      .then(day => {
        res.status(201).json(day)
      })
      .catch(next))
  .get('/:tripId/days/:number',
    (req, res, next) =>
      Day.findOne({
        where: {
          trip_id: req.params.tripId,
          number: req.params.number
        },
        include: [{all: true}]
      })
      .then(day => res.status(201).json(day))
      .catch(next))
  .post('/:tripId/days/:number',
    (req, res, next) =>
      Day.create({
        trip_id: req.params.tripId,
        number: req.params.number
      })
      .catch(next))
