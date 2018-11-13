import {
  table_CHANGE_PLACES_PAGE,
  table_CHANGE_PLACES_ROWS_PER_PAGE,
  table_FILTER_PLACES,
  table_RESET_SELECT,
  table_SELECT_PLACE,
  table_SELECT_PLACES,
  table_SORT_PLACES,
  table_UNSELECT_PLACE,
} from './action'

const initialState = {
  loading: false,
  allLoaded: false,
  error: null,
  current: undefined,
  order: 'asc',
  orderBy: 'title',
  selected: [],
  rows: [
    { key: 'title', disablePadding: false, label: 'Title' },
    { key: 'working_day', disablePadding: false, label: 'Working Day' },
    { key: 'working_hours', disablePadding: false, label: 'Working Hours' },
    { key: 'pictures', disablePadding: false, label: 'Pictures' },
    { key: 'videos', disablePadding: false, label: 'Videos' },
    { key: 'edit', disablePadding: false, label: 'Действия' },
  ],
  rowsPerPage: 10,
  page: 0,
  filtered: [],
}

const placesTableReducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case table_CHANGE_PLACES_PAGE:
      return {
        ...state,
        page: payload,
      }

    case table_CHANGE_PLACES_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: payload,
      }

    case table_SELECT_PLACES:
      return {
        ...state,
        selected: payload,
      }

    case table_UNSELECT_PLACE:
      return {
        ...state,
        selected: state.selected.filter(p => p !== payload),
      }

    case table_RESET_SELECT:
      return {
        ...state,
        selected: [],
      }

    case table_SELECT_PLACE: {
      const selected = [...state.selected]
      selected.push(payload)

      return {
        ...state,
        selected,
      }
    }

    case table_FILTER_PLACES: {
      const searchObject = Object.values(meta)

      const places = searchObject.filter((data) => {
        const searchString = Object.values(data).join(' ').toLowerCase()
        return !searchString.includes(payload.toLowerCase())
      })

      return {
        ...state,
        filtered: payload ? places.map(p => p.id.toString()) : [],
      }
    }

    case table_SORT_PLACES:
      return {
        ...state,
        order: payload.order,
        orderBy: payload.by,
      }

    default: {
      return state
    }
  }
}

export default placesTableReducer
