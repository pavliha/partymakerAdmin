import {
  CREATE_PLACE_FULFILLED,
  CREATE_PLACE_PENDING,
  CREATE_PLACE_REJECTED,

  LOAD_PLACE_FULFILLED,
  LOAD_PLACE_PENDING,
  LOAD_PLACE_REJECTED,
} from './action'

const initPlace = (place = {}) => ({
  loading: false,
  error: false,
  id: place.id,
  title: place.title,
  admin: place.admin,
  working_day: place.working_day,
  working_hours: place.working_hours,
  description: place.description,
  address: place.address,
  pictures: place.pictures,
  price: place.price,
})

const initialState = initPlace()

const placeReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_PLACE_PENDING:
    case CREATE_PLACE_PENDING:
      return {
        ...state,
        loading: true,
      }


    case LOAD_PLACE_REJECTED:
    case CREATE_PLACE_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case LOAD_PLACE_FULFILLED:
    case CREATE_PLACE_FULFILLED:
      return {
        ...state,
        ...initPlace(payload),
      }

    default:
      return state
  }
}

export default placeReducer
