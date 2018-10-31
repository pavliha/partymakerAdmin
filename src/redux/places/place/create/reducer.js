import { CREATE_PLACE_FULFILLED, CREATE_PLACE_PENDING, CREATE_PLACE_REJECTED, UPDATE_PLACE_FORM } from './action'


const initialState = {
  loading: false,
  error: false,
  form: {},
}

const createPlaceReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_PLACE_PENDING:
      return {
        ...state,
        loading: true,
      }


    case CREATE_PLACE_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case CREATE_PLACE_FULFILLED:
      return {
        ...state,
        // form: payload,
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

export default createPlaceReducer
