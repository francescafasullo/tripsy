import axios from 'axios'

/* ---- reducer ---- */
const reducer = (state = null, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips
    case GET_TRIP:
      return action.trip
  }
  return state
}

/* ---- actions ---- */
const GET_TRIPS = 'GET_TRIPS'
const GET_TRIP = 'GET_TRIP'

/* ---- action creators ---- */
export const getTrips = trips => ({
  type: GET_TRIPS, trips
})

export const getTrip = trip => ({
  type: GET_TRIP, trip
})

/* ---- dispatchers ---- */
export const fetchTrips = (userId) =>
  dispatch => {
    axios.get(`/api/users/${userId}/trips`)
      .then(res => res.data)
      .then(trips => dispatch(getTrips(trips)))
      .catch(err => console.error(err))
  }

export const fetchTrip = (tripId) =>
  dispatch => {
    axios.get(`/api/trips/${tripId}`)
      .then(res => res.data)
      .then(trip => dispatch(getTrip(trip)))
      .catch(err => console.error(err))
  }

export default reducer
