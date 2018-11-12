export const table_CHANGE_PLACES_PAGE = 'table/CHANGE_PLACES_PAGE'
export const table_CHANGE_PLACES_ROWS_PER_PAGE = 'table/CHANGE_PLACES_ROWS_PER_PAGE'
export const table_SELECT_PLACES = 'table/SELECT_PLACES'
export const table_SELECT_PLACE = 'table/SELECT_PLACE'
export const table_RESET_SELECT = 'table/RESET_SELECT'
export const table_FILTER_PLACES = 'table/FILTER_PLACES'
export const table_SORT_PLACES = 'table/SORT_PLACES'
export const table_UNSELECT_PLACE = 'table/UNSELECT_PLACE'

const select = place => ({
  type: table_SELECT_PLACE,
  payload: place,
})
const unselect = place => ({
  type: table_UNSELECT_PLACE,
  payload: place,
})

const selectAll = places => ({
  type: table_SELECT_PLACES,
  payload: places,
})

const resetSelect = () => ({
  type: table_RESET_SELECT,
})

const filter = keyword => ({
  type: table_FILTER_PLACES,
  payload: keyword,
})

const sort = ({ by, order }) => ({
  type: table_SORT_PLACES,
  payload: { by, order },
})

const changePage = page => ({
  type: table_CHANGE_PLACES_PAGE,
  payload: page,
})

const changeRowsPerPage = rowsPerPage => ({
  type: table_CHANGE_PLACES_ROWS_PER_PAGE,
  payload: rowsPerPage,
})

export default { select, unselect, selectAll, resetSelect, filter, sort, changePage, changeRowsPerPage }
