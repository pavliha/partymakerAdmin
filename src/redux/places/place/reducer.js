import {
  CREATE_PLACE_FULFILLED,
  CREATE_PLACE_PENDING,
  CREATE_PLACE_REJECTED,
  LOAD_PLACE_FULFILLED,
  LOAD_PLACE_PENDING,
  LOAD_PLACE_REJECTED,
  SET_PLACE,
  UPDATE_PLACE_FULFILLED,
  UPDATE_PLACE_PENDING,
  UPDATE_PLACE_REJECTED,
} from './action'

const placeReducer = (state = {}, { type, payload }) => {
  switch (type) {

    case SET_PLACE:
    case CREATE_PLACE_FULFILLED:
    case UPDATE_PLACE_FULFILLED:
    case LOAD_PLACE_FULFILLED:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...payload,
      }

    case LOAD_PLACE_PENDING:
    case CREATE_PLACE_PENDING:
    case UPDATE_PLACE_PENDING:
      return {
        ...state,
        loading: true,
      }

    case LOAD_PLACE_REJECTED:
    case CREATE_PLACE_REJECTED:
    case UPDATE_PLACE_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
      }

    default:
      return state
  }
}

export default placeReducer
