import {
  CREATE_PLACE_FULFILLED,
  CREATE_PLACE_PENDING,
  CREATE_PLACE_REJECTED,
  DELETE_PLACES_FULFILLED,
  DELETE_PLACES_PENDING,
  DELETE_PLACES_REJECTED,
  UPDATE_PLACE_FORM,
  UPDATE_PLACE_FULFILLED,
  UPDATE_PLACE_PENDING,
  UPDATE_PLACE_REJECTED,
} from './action'


const initialState = {
  loading: false,
  error: false,
  form: {},
  messages: null,
}

const actionsPlaceReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_PLACE_PENDING:
    case UPDATE_PLACE_PENDING:
    case DELETE_PLACES_PENDING:
      return {
        ...state,
        loading: true,
      }


    case CREATE_PLACE_REJECTED:
    case UPDATE_PLACE_REJECTED:
    case DELETE_PLACES_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case CREATE_PLACE_FULFILLED:
    case UPDATE_PLACE_FULFILLED:
      return {
        ...state,
        // form: payload,
      }

    case DELETE_PLACES_FULFILLED:
      return {
        ...state,
        messages: payload,
      }

    case UPDATE_PLACE_FORM:
      return {
        ...state,
        form: { ...state.form, ...payload },
      }

    default:
      return state
  }
}

export default actionsPlaceReducer
