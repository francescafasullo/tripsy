import axios from 'axios'

/* ---- reducer ---- */
const reducer = (state = null, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips
    case GET_TRIP:
      return Object.assign({}, state, {
        trip: action.trip
      })
    case GET_DAY:
      return Object.assign({}, state, {
        currentDay: action.day
      })
    case GET_DAYS:
      return Object.assign({}, state, {
        days: action.days
      })
  }
  return state
}

/* ---- actions ---- */
const GET_TRIPS = 'GET_TRIPS'
const GET_TRIP = 'GET_TRIP'
const GET_DAY = 'GET_DAY'
const GET_DAYS = 'GET_DAYS'

/* ---- action creators ---- */
export const getTrips = trips => ({
  type: GET_TRIPS, trips
})

export const getTrip = trip => ({
  type: GET_TRIP, trip
})

export const getDay = day => ({
  type: GET_DAY, day
})

export const getDays = days => ({
  type: GET_DAYS, days
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

export const fetchDays = (tripId) =>
  dispatch => {
    axios.get(`/api/trips/${tripId}/days`)
      .then(res => res.data)
      .then(days => dispatch(getDays(days)))
      .catch(err => console.error(err))
  }

export const fetchDay = (dayId) =>
  dispatch => {
    axios.get(`/api/trips/days/${dayId}`)
      .then(res => res.data)
      .then(day => dispatch(getDay(day)))
      .catch(err => console.error(err))
  }

export const setFirstDay = (tripId) =>
  dispatch => {
    axios.get(`/api/trips/${tripId}/days/1`)
      .then(res => res.data)
      .then(day => {
        console.log('day', day)
        dispatch(getDay(day))
      })
      .catch(err => console.error(err))
  }

export default reducer
