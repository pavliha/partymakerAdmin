import Labels from 'services/api/Labels'

export const SEARCH_LABELS = 'SEARCH_LABELS'

export const LOAD_LABELS = 'LOAD_LABELS'
export const LOAD_LABELS_PENDING = 'LOAD_LABELS_PENDING'
export const LOAD_LABELS_FULFILLED = 'LOAD_LABELS_FULFILLED'
export const LOAD_LABELS_REJECTED = 'LOAD_LABELS_REJECTED'

const load = () => ({
  type: LOAD_LABELS,
  payload: Labels.all(),
})

const search = value => ({
  type: SEARCH_LABELS,
  payload: value,
})

export default { load, search }
