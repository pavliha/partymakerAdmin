import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/reducer'
import layoutReducer from './layout/reducer'
import headerReducer from './header/reducer'
import placesReducer from './places/reducer'
import createPlaceReducer from './places/place/create/reducer'
import modalReducer from './modal/reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'],
}

const reducers = combineReducers({
  authReducer,
  modalReducer,
  placesReducer,
  createPlaceReducer,
  layoutReducer,
  headerReducer,
})

export default persistReducer(persistConfig, reducers)
