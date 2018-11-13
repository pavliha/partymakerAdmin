import arrayToObject from 'utils/arrayToObject'
import isEmpty from 'lodash/isEmpty'
import placeReducer from './place/reducer'
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

    default: {
      const places = { ...state.places }
      const place = placeReducer(places[state.current], { type, payload, meta })

      if (!isEmpty(place)) {
        places[state.current] = place

        return { ...state, places }
      }

      return state
    }
  }
}

export default placesReducer
