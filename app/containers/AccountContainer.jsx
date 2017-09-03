import React from 'react'
import { connect } from 'react-redux'
import Account from '../components/Account'

const mapStateToProps = state => ({
  loggedInUser: state.auth,
  trips: state.trip
})

export default connect(mapStateToProps)(Account)
