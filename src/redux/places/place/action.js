import Place from 'services/api/Place'

export const SET_PLACE = 'SET_PLACE'

export const LOAD_PLACE = 'LOAD_PLACE'
export const LOAD_PLACE_PENDING = 'LOAD_PLACE_PENDING'
export const LOAD_PLACE_FULFILLED = 'LOAD_PLACE_FULFILLED'
export const LOAD_PLACE_REJECTED = 'LOAD_PLACE_REJECTED'

export const CREATE_PLACE = 'CREATE_PLACE'
export const CREATE_PLACE_PENDING = 'CREATE_PLACE_PENDING'
export const CREATE_PLACE_REJECTED = 'CREATE_PLACE_REJECTED'
export const CREATE_PLACE_FULFILLED = 'CREATE_PLACE_FULFILLED'

export const UPDATE_PLACE = 'UPDATE_PLACE'
export const UPDATE_PLACE_PENDING = 'UPDATE_PLACE_PENDING'
export const UPDATE_PLACE_REJECTED = 'UPDATE_PLACE_REJECTED'
export const UPDATE_PLACE_FULFILLED = 'UPDATE_PLACE_FULFILLED'

export const DELETE_PLACE = 'DELETE_PLACE'
export const DELETE_PLACE_PENDING = 'DELETE_PLACE_PENDING'
export const DELETE_PLACE_REJECTED = 'DELETE_PLACE_REJECTED'
export const DELETE_PLACE_FULFILLED = 'DELETE_PLACE_FULFILLED'

const load = place_id => ({
  type: LOAD_PLACE,
  payload: Place.find(place_id),
  meta: { place_id },
})

const set = place => ({
  type: SET_PLACE,
  payload: place,
})

const create = form => ({
  type: CREATE_PLACE,
  payload: Place.create(form),
})

const update = (id, form) => ({
  type: UPDATE_PLACE,
  payload: Place.update(id, form),
})

const remove = id => ({
  type: DELETE_PLACE,
  payload: Place.delete(id),
  meta: { place_id: id },
})

export default { load, set, create, update, remove }
