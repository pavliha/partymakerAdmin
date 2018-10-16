export const SET_HEADER_ICON = 'SET_HEADER_ICON'
export const SET_HEADER_TITLE = 'SET_HEADER_TITLE'
export const RESET_HEADER_TITLE = 'RESET_HEADER_TITLE'

const back = (url) => ({
  type: SET_HEADER_ICON,
  payload: {
    icon: 'back', url,
  },
})

const menu = () => ({
  type: SET_HEADER_ICON,
  payload: {
    icon: 'menu',
  },
})

export const setIcon = (icon) => ({
  type: SET_HEADER_ICON,
  payload: { icon },
})

const setTitle = title => ({
  type: SET_HEADER_TITLE,
  payload: { title },
})

const resetTitle = () => ({
  type: RESET_HEADER_TITLE,
})

export default { back, menu, setIcon, setTitle, resetTitle }
