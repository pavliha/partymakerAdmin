import Place from 'services/api/Place'

export const CREATE_PLACE = 'CREATE_PLACE'
export const CREATE_PLACE_PENDING = 'CREATE_PLACE_PENDING'
export const CREATE_PLACE_REJECTED = 'CREATE_PLACE_REJECTED'
export const CREATE_PLACE_FULFILLED = 'CREATE_PLACE_FULFILLED'

export const UPDATE_PLACE_FORM = 'UPDATE_PLACE_FORM'

// noinspection JSUnusedGlobalSymbols
export const update = ({ ...form }) => ({
  type: UPDATE_PLACE_FORM,
  payload: form,
})

// noinspection JSUnusedGlobalSymbols
export const create = form => ({
  type: CREATE_PLACE,
  payload: Place.create(form),
})


export default { update, create }