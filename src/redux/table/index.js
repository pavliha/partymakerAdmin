import { combineReducers } from 'redux'
import placesReducer from './places/reducer'

const reducers = combineReducers({
  placesReducer,
})

export default reducers
