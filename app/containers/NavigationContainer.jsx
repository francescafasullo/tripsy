import React from 'react'
import { connect } from 'react-redux'
import Navigation from '../components/Navigation'

const mapStateToProps = state => ({
  loggedInUser: state.auth
})

export default connect(mapStateToProps)(Navigation)
