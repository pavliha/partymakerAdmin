import { LOAD_LABELS_FULFILLED, LOAD_LABELS_PENDING, LOAD_LABELS_REJECTED, SEARCH_LABELS } from './action'

const initialState = {
  errors: [],
  error: false,
  loading: false,
  labels: null,
  filterLabel: null,
}

const labelsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_LABELS_PENDING:
      return {
        ...state,
        loading: true,
      }


    case LOAD_LABELS_REJECTED:
      return {
        ...state,
        error: true,
        errors: payload,
        loading: false,
      }

    case LOAD_LABELS_FULFILLED:
      return {
        ...state,
        loading: false,
        labels: payload,
        filterLabel: payload,
      }

    case SEARCH_LABELS: {
      const { labels } = state

      const search = payload.toLowerCase()
      let resultSearch = labels.filter((label) => {
        const allInfo = `${Object.values(label).join('')}`
        return allInfo.toLowerCase().includes(search)
      })

      if (payload === '') resultSearch = labels

      return {
        ...state,
        filterLabel: resultSearch,
      }
    }

    default:
      return state
  }
}

export default labelsReducer
