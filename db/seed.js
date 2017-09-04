'use strict'

const db = require('APP/db')
    , {User, Activity, Trip, Hotel, Restaurant, Day, DayHotel, DayRestaurant, DayActivity, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
  }

  seeded.trips = trips(seeded)
  seeded.activities = activities(seeded)
  seeded.hotels = hotels(seeded)
  seeded.restaurants = restaurants(seeded)
  seeded.days = days(seeded)
  seeded.dayHotels = dayHotels(seeded)
  seeded.dayRestaurants = dayRestaurants(seeded)
  seeded.dayActivities = dayActivities(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@example.com',
    name: 'So many names',
    password: '1234',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
  francesca: {
    name: 'Francesca',
    email: 'francescafasullo@gmail.com',
    password: 'password'
  },
  claire: {
    name: 'Claire',
    email: 'claire@claire.claire',
    password: 'buttz'
  },
  sarah: {
    name: 'Sarah Salami',
    email: 'salamigrl@salami.club',
    password: 'jenna'
  }
})

const trips = seed(Trip,
  ({users}) => ({
    'francescaTrip': {
      user_id: users.francesca.id,
      name: 'My First Trip to NYC!',
      start: '2017-10-02',
      end: '2017-10-09'
    },
  })
)

const days = seed(Day,
  ({trips}) => ({
    'day1': {
      trip_id: trips.francescaTrip.id,
      number: 1
    }
  })
)

const hotels = seed(Hotel,
  ({users, trips}) => ({
    'theStandard': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'The Standard',
      street: '848 Washington Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.7409232, -74.00811099999999]
    },
    'greenwichHotel': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'The Greenwich Hotel',
      street: '377 Greenwich Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.71982200000001, -74.00986069999999]
    }
  })
)

const restaurants = seed(Restaurant,
  ({users, trips}) => ({
    'missionChinese': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'Mission Chinese',
      street: '171 East Broadway',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.7139327, -73.98965290000001]
    },
    'theOdeon': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'The Odeon',
      street: '145 West Broadway',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.71697899999999, -74.007834]
    },
    'spicyVillage': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'Spicy Village',
      street: '68 Forsyth Street #B',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.716974, -73.99325499999998]
    },
    'leCoucou': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'Le Coucou',
      street: '138 Lafayette Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.719139, -74.00025]
    },
    'wildair': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'Wildair',
      street: '142 Orchard Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.7200208, -73.98916329999997]
    },
    'uncleBoons': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'Uncle Boons',
      street: '7 Spring Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.7213514, -73.99435849999998]
    }
  })
)

const activities = seed(Activity,
  ({users, trips}) => ({
    'theHighLine': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'The High Line',
      street: '511 West 23rd Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.7479925, -74.0047649]

    },
    'chelseaMarket': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'Chelsea Market',
      street: '75 9th Avenue',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.74217059999999, -74.0050918]
    },
    'theMet': {
      user_id: users.francesca.id,
      trip_id: trips.francescaTrip.id,
      name: 'The Metropolitan Museum of Art',
      street: '1000 5th Ave',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      location: [40.7794366, -73.96324400000003]
    },
  })
)

const dayHotels = seed(DayHotel,
  ({days, hotels}) => ({
    'day1hotel': {
      day_id: days.day1.id,
      hotel_id: hotels.theStandard.id
    }
  })
)

const dayRestaurants = seed(DayRestaurant,
  ({days, restaurants}) => ({
    'day1restaurant1': {
      day_id: days.day1.id,
      restaurant_id: restaurants.missionChinese.id
    },
    'day1restaurant2': {
      day_id: days.day1.id,
      restaurant_id: restaurants.theOdeon.id
    },
    'day1restaurant3': {
      day_id: days.day1.id,
      restaurant_id: restaurants.uncleBoons.id
    }
  })
)

const dayActivities = seed(DayActivity,
  ({days, activities}) => ({
    'day1activity1': {
      day_id: days.day1.id,
      activity_id: activities.theHighLine.id
    },
    'day1activity2': {
      day_id: days.day1.id,
      activity_id: activities.chelseaMarket.id
    },
    'day1activity3': {
      day_id: days.day1.id,
      activity_id: activities.theMet.id
    }
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, activities, trips, hotels, restaurants, days, dayHotels, dayRestaurants, dayActivities})
