import React from 'react'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name">
      <Link className="account-link" to={`/users/${user.id}`}>
       Hello, {user && user.name}!
      </Link>
    </span>
    <Button bsSize="small" className="logout btn btn-secondary" onClick={logout}>Logout</Button>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
