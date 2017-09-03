'use strict'

const db = require('APP/db')
const User = db.model('users')
const Trip = db.model('trips')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id, { include: [Trip] })
      .then(user => res.json(user))
      .catch(next))
  .get('/:id/trips',
    (req, res, next) => {
      console.log('in the get')
      return Trip.findAll({
        where: {
          user_id: req.params.id
        }
      })
        .then((trips) => {
          res.json(trips)
        })
        .catch(next)
    })
