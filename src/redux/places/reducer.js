/* eslint-disable no-fallthrough */
import {
  CANCEL_PLACE,
  CHANGE_PLACES_PAGE,
  CHANGE_PLACES_ROWS_PER_PAGE,
  FILTER_PLACES,
  LOAD_PLACES_FULFILLED,
  LOAD_PLACES_PENDING,
  LOAD_PLACES_REJECTED,
  OPEN_PLACE,
  RESET_SELECT,
  SELECT_PLACE,
  SELECT_PLACES,
  SORT_PLACES,
} from './action'
import placeReducer from './place/reducer'

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
    { key: 'description', disablePadding: false, label: 'description' },
    { key: 'edit', disablePadding: false, label: 'Редактировать' },
  ],
  rowsPerPage: 10,
  page: 0,
  places: [],
  filteredPlaces: [],
}

const placesReducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {

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

    case LOAD_PLACES_FULFILLED: {
      const places = payload.data
      return {
        ...state,
        loading: false,
        allLoaded: true,
        filteredPlaces: places,
        places,
      }
    }

    case OPEN_PLACE: {
      const places = [...state.places]

      const place = places.find(p => p.id === parseInt(payload))

      return { ...state, current: place }
    }

    case CANCEL_PLACE: {
      return { ...state, current: undefined }
    }

    case CHANGE_PLACES_PAGE:
      return { ...state, page: payload }

    case CHANGE_PLACES_ROWS_PER_PAGE:
      return { ...state, rowsPerPage: payload }

    case SELECT_PLACES:
      return { ...state, selected: payload }

    case RESET_SELECT:
      return { ...state, selected: [] }

    case SELECT_PLACE: {
      let selected = [...state.selected]
      const isSelected = selected.map(p => p.id)
        .includes(payload.id)

      if (!isSelected) {
        selected.push(payload)
      } else {
        selected = selected.filter(p => p.id !== payload.id)
      }

      return { ...state, selected }
    }

    case FILTER_PLACES: {
      let places = state.places.filter((data) => {
        const searchString = Object.values(data)
          .join(' ')
          .toLowerCase()
        return searchString.includes(payload.toLowerCase())
      })

      if (!payload) places = [...state.places]

      return {
        ...state,
        filteredPlaces: places,
      }
    }

    case SORT_PLACES: {
      const places = [...Object.values(state.places)]

      // const sorted = places.sort((prev, next) =>
      //   prev[payload.by].localeCompare(next[payload.by]))

      return {
        ...state,
        order: payload.order,
        orderBy: payload.by,
        filteredPlaces: payload.order === 'asc' ? places : places.reverse(),
      }
    }

    default: {
      const places = [...state.places]
      const place = placeReducer(state.current, { type, payload, meta })
      const place_id = place.id || (meta && meta.place_id)
      if (place_id) places[places.findIndex(p => p.id === parseInt(payload))] = place

      return { ...state, places }
    }
  }
}

export default placesReducer
