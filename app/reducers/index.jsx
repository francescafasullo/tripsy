import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  trip: require('./trip').default,
})

export default rootReducer
