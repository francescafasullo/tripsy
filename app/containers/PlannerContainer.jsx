import React from 'react'
import { connect } from 'react-redux'
import Planner from '../components/Planner'

const mapStateToProps = state => ({
  loggedInUser: state.auth,
  trip: state.trip
})

export default connect(mapStateToProps)(Planner)
