import React from 'react'
import { connect } from 'react-redux'
import Planner from '../components/Planner'
import { addDayToTrip } from '../reducers/trip.jsx'

const mapStateToProps = state => ({
  loggedInUser: state.auth,
  trip: state.trip
})

const mapDispatchToProps = dispatch => {
  return {
    addDayToTrip(tripId, dayNum) {
      dispatch(addDayToTrip(tripId, dayNum))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
