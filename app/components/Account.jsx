import React from 'react'
import { Link } from 'react-router'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.loggedInUser
    const trips = this.props.trips
    console.log('PROPS IN ACCOUNT', this.props)
    return (
      <div>
      {
        user &&
          <div>
            <h3>{user.name}</h3>
            <h5>{user.email}</h5>
          </div>
      }
      <h3>My Trips</h3>
      {
        trips && trips.map((trip) => {
          return (
            <div key={trip.id}>
              <Link to={`/trips/${trip.id}`} >
                <h5>{trip.name}</h5>
              </Link>
            </div>
          )
        })
      }
      </div>
    )
  }
}
