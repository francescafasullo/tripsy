const db = require('APP/db')
const Trip = db.model('trips')
const Day = db.model('days')

module.exports = require('express').Router()
  .get('/:id',
    (req, res, next) =>
      Trip.findOne({
        where: {
          id: req.params.id
        },
        include: [{all: true}]
      })
      .then(trip => res.status(201).json(trip))
      .catch(next))
  .get('/:id/days',
    (req, res, next) =>
      Trip.findOne({
        where: {
          id: req.params.id
        },
        include: [{all: true}]
      })
      .then(trip => {
        return Day.findAll({
          where: {
            trip_id: trip.id
          },
          include: [{all: true}]
        })
      })
      .then(days => {
        res.json(days)
      })
      .catch(next))
