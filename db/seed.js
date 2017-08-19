'use strict'

const db = require('APP/db')
    , {User, Activity, Place, Trip, Hotel, Restaurant, Day, DayHotel, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    places: places()
    // activities: activities(),
  }

  seeded.activities = activities(seeded)
  seeded.trips = trips(seeded)
  seeded.hotels = hotels(seeded)
  seeded.restaurants = restaurants(seeded)
  seeded.days = days(seeded)
  seeded.dayHotels = dayHotels(seeded)

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
  }
})

const places = seed(Place, {
  highline: {
    street: '511 West 23rd Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.7479925, -74.0047649]
  },
  chelseaMarket: {
    street: '75 9th Avenue',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.74217059999999, -74.0050918]
  },
  met: {
    street: '1000 5th Ave',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.7794366, -73.96324400000003]
  },
  standard: {
    street: '848 Washington Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.7409232, -74.00811099999999]
  },
  greenwichHotel: {
    street: '377 Greenwich Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.71982200000001, -74.00986069999999]
  },
  missionChinese: {
    street: '171 East Broadway',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.7139327, -73.98965290000001]
  },
  odeon: {
    street: '145 West Broadway',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.71697899999999, -74.007834]
  },
  spicyVillage: {
    street: '68 Forsyth Street #B',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.716974, -73.99325499999998]
  },
  coucou: {
    street: '138 Lafayette Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.719139, -74.00025]
  },
  wildair: {
    street: '142 Orchard Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.7200208, -73.98916329999997]
  },
  boons: {
    street: '7 Spring Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    location: [40.7213514, -73.99435849999998]
  }
})

const hotels = seed(Hotel,
  ({users, places}) => ({
    'theStandard': {
      user_id: users.francesca.id,
      place_id: places.standard.id,
      name: 'The Standard'
    },
    'greenwichHotel': {
      user_id: users.francesca.id,
      place_id: places.greenwichHotel.id,
      name: 'The Greenwich Hotel'
    }
  })
)

const restaurants = seed(Restaurant,
  ({users, places}) => ({
    'missionChinese': {
      user_id: users.francesca.id,
      place_id: places.missionChinese.id,
      name: 'Mission Chinese'
    },
    'theOdeon': {
      user_id: users.francesca.id,
      place_id: places.odeon.id,
      name: 'The Odeon'
    },
    'spicyVillage': {
      user_id: users.francesca.id,
      place_id: places.spicyVillage.id,
      name: 'Spicy Village'
    },
    'leCoucou': {
      user_id: users.francesca.id,
      place_id: places.coucou.id,
      name: 'Le Coucou'
    },
    'wildair': {
      user_id: users.francesca.id,
      place_id: places.wildair.id,
      name: 'Wildair'
    },
    'uncleBoons': {
      user_id: users.francesca.id,
      place_id: places.boons.id,
      name: 'Uncle Boons'
    }
  })
)

const activities = seed(Activity,
  ({users, places}) => ({
    'theHighLine': {
      user_id: users.francesca.id,
      place_id: places.highline.id,
      name: 'The High Line'

    },
    'chelseaMarket': {
      user_id: users.francesca.id,
      place_id: places.chelseaMarket.id,
      name: 'Chelsea Market'
    },
    'theMet': {
      user_id: users.francesca.id,
      place_id: places.met.id,
      name: 'The Metropolitan Museum of Art'
    },
  })
)

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

const dayHotels = seed(DayHotel,
  ({days, hotels}) => ({
    'day1hotel': {
      day_id: days.day1.id,
      hotel_id: hotels.theStandard.id
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

module.exports = Object.assign(seed, {users, activities, places, trips, hotels, restaurants, days, dayHotels})
