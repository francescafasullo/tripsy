'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Home from './components/Home'

import NavigationContainer from './containers/NavigationContainer'
import PlannerContainer from './containers/PlannerContainer'
import AccountContainer from './containers/AccountContainer'
import { fetchTrips, fetchTrip } from './reducers/trip.jsx'

export const onAccountEnter = nextRouterState => {
  const userId = nextRouterState.params.userId
  store.dispatch(fetchTrips(userId))
}

export const onPlannerEnter = nextRouterState => {
  const tripId = nextRouterState.params.tripId
  store.dispatch(fetchTrip(tripId))
}

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        <NavigationContainer user={user} />
      </nav>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/trips/:tripId" component={PlannerContainer} onEnter={onPlannerEnter} />
        <Route path="/users/:userId" component={AccountContainer} onEnter={onAccountEnter} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
