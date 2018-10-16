import Place from 'services/api/Place'

export const OPEN_PLACE = 'OPEN_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'
export const LOAD_PLACES_PENDING = 'LOAD_PLACES_PENDING'
export const LOAD_PLACES_REJECTED = 'LOAD_PLACES_REJECTED'
export const LOAD_PLACES_FULFILLED = 'LOAD_PLACES_FULFILLED'
export const CHANGE_PLACES_PAGE = 'CHANGE_PLACES_PAGE'
export const CHANGE_PLACES_ROWS_PER_PAGE = 'CHANGE_PLACES_ROWS_PER_PAGE'
export const FILTER_PLACES = 'FILTER_PLACES'
export const SELECT_PLACES = 'SELECT_PLACES'
export const SORT_PLACES = 'SORT_PLACES'
export const SELECT_PLACE = 'SELECT_PLACE'

const load = (params) => ({
  type: LOAD_PLACES,
  payload: Place.all(params),
})

const open = place_id => ({
  type: OPEN_PLACE,
  payload: place_id,
})

const select = (employee) => ({
  type: SELECT_PLACE,
  payload: employee,
})

const selectAll = (employees) => ({
  type: SELECT_PLACES,
  payload: employees,
})

const filter = (keyword) => ({
  type: FILTER_PLACES,
  payload: keyword,
})

const sort = ({ by, order }) => ({
  type: SORT_PLACES,
  payload: { by, order },
})

const changePage = (page) => ({
  type: CHANGE_PLACES_PAGE,
  payload: page,
})

const changeRowsPerPage = (rowsPerPage) => ({
  type: CHANGE_PLACES_ROWS_PER_PAGE,
  payload: rowsPerPage,
})

export default { load, open, select, selectAll, filter, sort, changePage, changeRowsPerPage }
