import arrayToObject from 'utils/arrayToObject'
import isEmpty from 'lodash/isEmpty'
import placeReducer from './place/reducer'
import { CREATE_PLACE_FULFILLED, DELETE_PLACE_FULFILLED, UPDATE_PLACE_FULFILLED } from './place/action'
import { LOAD_PLACES_FULFILLED, LOAD_PLACES_PENDING, LOAD_PLACES_REJECTED, OPEN_PLACE } from './action'

const initialState = {
  loading: false,
  allLoaded: false,
  error: null,
  current: undefined,
  places: {},
}

const placesReducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {

    case OPEN_PLACE:
      return {
        ...state,
        current: payload,
      }

    case LOAD_PLACES_PENDING:
      return {
        ...state,
        loading: true,
      }

    case LOAD_PLACES_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case LOAD_PLACES_FULFILLED:
      return {
        ...state,
        loading: false,
        allLoaded: true,
        places: arrayToObject(payload.data),
      }

    case UPDATE_PLACE_FULFILLED:
    case CREATE_PLACE_FULFILLED: {
      const places = { ...state.places }
      places[payload.id] = placeReducer(payload, { type, payload, meta })

      return {
        ...state,
        places,
      }
    }

    case DELETE_PLACE_FULFILLED: {
      const places = { ...state.places }
      delete places[meta.place_id]
      return {
        ...state,
        places,
      }
    }

    default: {
      const places = { ...state.places }
      const place = placeReducer(places[state.current], { type, payload, meta })

      if (!isEmpty(state.current && place && place.id)) {
        places[state.current] = place

        return { ...state, places }
      }

      return state
    }
  }
}

export default placesReducer
